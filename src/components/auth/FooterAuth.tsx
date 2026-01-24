import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useAdminMode } from '@/hooks/useAdminMode';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, Eye, EyeOff, KeyRound } from 'lucide-react';
import { AdminModeSelector } from './AdminModeSelector';
import { authSchema } from '@/lib/validations';
import { supabase } from '@/integrations/supabase/client';

export const FooterAuth = () => {
  const [open, setOpen] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bootstrapKey, setBootstrapKey] = useState('');
  const [mode, setMode] = useState<'signin' | 'bootstrap'>('signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, isAdmin, signIn, signOut } = useAuth();
  const { setAdminMode } = useAdminMode();
  const { toast } = useToast();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setBootstrapKey('');
    setShowPassword(false);
    setMode('signin');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully signed in!",
      });
      setOpen(false);
      resetForm();
      setShowModeSelector(true);
    }
    setLoading(false);
  };

  const handleBootstrap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: 'Validation Error',
        description: validation.error.errors[0].message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    if (!bootstrapKey) {
      toast({
        title: 'Missing Bootstrap Key',
        description: 'Enter the bootstrap key to reset your admin password.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('bootstrap-admin', {
        body: { email, password, key: bootstrapKey },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      // Immediately sign in with the freshly set password
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;

      toast({
        title: 'Admin Access Granted',
        description: 'Password updated and you are now signed in. Redirecting to admin panel…',
      });

      setOpen(false);
      resetForm();
      setShowModeSelector(true);
      // Navigate user to admin panel after auth state updates.
      setTimeout(() => {
        window.location.assign('/admin');
      }, 300);
    } catch (err: any) {
      toast({
        title: 'Bootstrap Failed',
        description: err?.message || 'Failed to reset admin access.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setAdminMode(null);
    toast({
      title: "Success",
      description: "Successfully signed out!",
    });
  };

  if (user && isAdmin) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
        <AdminModeSelector 
          open={showModeSelector} 
          onOpenChange={setShowModeSelector} 
        />
      </>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{mode === 'signin' ? 'Admin Sign In' : 'Admin Recovery (Bootstrap Key)'}</DialogTitle>
          </DialogHeader>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === 'signin' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
              onClick={() => setMode('signin')}
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button
              type="button"
              variant={mode === 'bootstrap' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
              onClick={() => setMode('bootstrap')}
              disabled={loading}
            >
              <KeyRound className="mr-2 h-4 w-4" />
              Recovery
            </Button>
          </div>

          <form onSubmit={mode === 'signin' ? handleSignIn : handleBootstrap} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {mode === 'bootstrap' && (
              <div className="space-y-2">
                <Label htmlFor="bootstrapKey">Bootstrap Key</Label>
                <Input
                  id="bootstrapKey"
                  type="password"
                  value={bootstrapKey}
                  onChange={(e) => setBootstrapKey(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will set/reset the password and grant the admin role, then sign you in.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading
                ? mode === 'signin'
                  ? 'Signing In...'
                  : 'Applying Recovery...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Recover & Sign In'}
            </Button>

            {mode === 'signin' && (
              <Button
                type="button"
                variant="link"
                className="w-full text-muted-foreground"
                onClick={() => setMode('bootstrap')}
                disabled={loading}
              >
                Still locked out? Use Bootstrap Key Recovery
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
      <AdminModeSelector 
        open={showModeSelector} 
        onOpenChange={setShowModeSelector} 
      />
    </>
  );
};