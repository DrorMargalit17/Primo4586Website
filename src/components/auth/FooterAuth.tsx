import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useAdminMode } from '@/hooks/useAdminMode';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut } from 'lucide-react';
import { AdminModeSelector } from './AdminModeSelector';

export const FooterAuth = () => {
  const [open, setOpen] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, signIn, signOut } = useAuth();
  const { setAdminMode } = useAdminMode();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      setEmail('');
      setPassword('');
      setShowModeSelector(true);
    }
    setLoading(false);
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
            <DialogTitle>Admin Sign In</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4">
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
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
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