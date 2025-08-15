import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogIn, LogOut, Shield } from 'lucide-react';

export const AdminToggle = () => {
  const { user, isAdmin, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (user && isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="default" className="flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Admin
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary">User</Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <AuthModal>
      <Button variant="outline" size="sm">
        <LogIn className="mr-2 h-4 w-4" />
        Admin Login
      </Button>
    </AuthModal>
  );
};