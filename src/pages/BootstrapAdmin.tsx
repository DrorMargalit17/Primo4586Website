import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Loader2 } from "lucide-react";

/**
 * Bootstrap Admin Page
 * This is a hidden page for granting admin access when no admins exist.
 * Requires a secret key configured in BOOTSTRAP_ADMIN_KEY.
 * After using it, you should delete or disable this page.
 */
const BootstrapAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !key) {
      toast({
        title: "Error",
        description: "Email, password and bootstrap key are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // 1) Ensure the account exists (sign up). If it already exists, this will error and we continue.
      const redirectUrl = `${window.location.origin}/`;
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });

      // If email confirmations are enabled, signUp may require email confirmation.
      // We'll still attempt sign-in below to provide a clear error if confirmation is required.
      if (signUpError && signUpError.message && !/already registered|already exists/i.test(signUpError.message)) {
        // Non "already registered" errors should stop.
        // (e.g. password policy, invalid email, etc.)
        throw new Error(signUpError.message);
      }

      // 2) Sign in to establish a session (optional but helpful for the UX)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        throw new Error(signInError.message);
      }

      // 3) Grant admin via edge function using the bootstrap key
      const { data, error } = await supabase.functions.invoke("bootstrap-admin", {
        body: { email, key },
      });

      if (error) {
        throw new Error(error.message || "Failed to bootstrap admin");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Success!",
        description: data.already_admin
          ? "User already has admin privileges"
          : "Admin role granted successfully. You can now open /admin.",
      });

      setEmail("");
      setPassword("");
      setKey("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to grant admin role",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 bg-gradient-surface border-border">
        <div className="text-center mb-6">
          <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Bootstrap Admin</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Grant admin privileges using the secret bootstrap key
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a strong password"
              className="mt-1"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Must match the site policy (min 12 chars, upper/lowercase, number).
            </p>
          </div>

          <div>
            <Label htmlFor="key">Bootstrap Key</Label>
            <Input
              id="key"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter secret key"
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Grant Admin Access
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          This page requires a valid bootstrap key configured in the server.
        </p>
      </Card>
    </div>
  );
};

export default BootstrapAdmin;
