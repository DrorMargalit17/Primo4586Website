import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, RotateCcw, UserCheck, UserX } from "lucide-react";
import { authSchema } from "@/lib/validations";

interface User {
  id: string;
  email: string;
  created_at: string;
  is_admin?: boolean;
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetLoading, setResetLoading] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("user_id, email, is_admin, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const userData: User[] = profiles.map(profile => ({
        id: profile.user_id,
        email: profile.email || "",
        created_at: profile.created_at,
        is_admin: profile.is_admin
      }));

      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!resetEmail || !newPassword) {
      toast({
        title: "Error",
        description: "Please provide both email and new password",
        variant: "destructive",
      });
      return;
    }

    // Validate password with authSchema
    const validation = authSchema.shape.password.safeParse(newPassword);
    
    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setResetLoading(resetEmail);

    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("reset-password", {
        body: {
          email: resetEmail,
          newPassword: newPassword,
        },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Password reset successfully for ${resetEmail}`,
      });

      // Clear form
      setResetEmail("");
      setNewPassword("");
      setShowPassword(false);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setResetLoading(null);
    }
  };

  const toggleAdminStatus = async (userId: string, currentAdminStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: !currentAdminStatus })
        .eq("user_id", userId);

      if (error) throw error;

      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, is_admin: !currentAdminStatus }
          : user
      ));

      toast({
        title: "Success",
        description: `User ${!currentAdminStatus ? 'promoted to' : 'removed from'} admin`,
      });
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    }
  };

  const registerAdmin = async () => {
    // Validate inputs with authSchema
    const validation = authSchema.safeParse({
      email: adminEmail,
      password: adminPassword
    });

    if (!validation.success) {
      toast({
        title: "Validation Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setRegisterLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;

      if (data.user) {
        // Update the user's profile to make them an admin
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ is_admin: true })
          .eq("user_id", data.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Success",
          description: `Admin account created successfully for ${adminEmail}`,
        });

        // Clear form and refresh users list
        setAdminEmail("");
        setAdminPassword("");
        setShowAdminPassword(false);
        fetchUsers();
      }
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Admin Registration Section */}
      <Card className="p-6 bg-gradient-surface border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Register New Administrator</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="admin-email" className="text-foreground">Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="admin-password" className="text-foreground">Admin Password</Label>
            <div className="relative mt-1">
              <Input
                id="admin-password"
                type={showAdminPassword ? "text" : "password"}
                placeholder="Enter password (min 6 characters)"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
              >
                {showAdminPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <Button
            onClick={registerAdmin}
            disabled={registerLoading}
            className="w-full"
          >
            {registerLoading ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Creating Admin...
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Create Administrator
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Password Reset Section */}
      <Card className="p-6 bg-gradient-surface border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Reset User Password</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reset-email" className="text-foreground">User Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="user@example.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-foreground">New Password</Label>
            <div className="relative mt-1">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <Button
            onClick={resetPassword}
            disabled={resetLoading !== null}
            className="w-full"
          >
            {resetLoading === resetEmail ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Password
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Users List */}
      <Card className="p-6 bg-gradient-surface border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Manage Users</h3>
        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{user.email}</p>
                    {user.is_admin && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-primary text-primary-foreground">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResetEmail(user.email)}
                    className="text-xs"
                  >
                    Select for Reset
                  </Button>
                  <Button
                    variant={user.is_admin ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleAdminStatus(user.id, user.is_admin || false)}
                    className="text-xs"
                  >
                    {user.is_admin ? (
                      <>
                        <UserX className="mr-1 h-3 w-3" />
                        Remove Admin
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-1 h-3 w-3" />
                        Make Admin
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserManager;