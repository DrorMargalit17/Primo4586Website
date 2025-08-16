import { useAuth } from '@/hooks/useAuth';
import { useAdminMode } from '@/hooks/useAdminMode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Edit3, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminModeToggle = () => {
  const { isAdmin } = useAuth();
  const { adminMode, setAdminMode } = useAdminMode();
  const navigate = useNavigate();

  if (!isAdmin || !adminMode) return null;

  const toggleMode = () => {
    const newMode = adminMode === 'panel' ? 'edit' : 'panel';
    setAdminMode(newMode);
    
    if (newMode === 'panel') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const exitAdminMode = () => {
    setAdminMode(null);
    navigate('/');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Badge variant="default" className="flex items-center gap-1">
        {adminMode === 'panel' ? (
          <>
            <Settings className="h-10 w-3" />
            Admin Panel
          </>
        ) : (
          <>
            <Edit3 className="h-10 w-3" />
            Edit Mode
          </>
        )}
      </Badge>
      <Button
        size="sm"
        variant="outline"
        onClick={toggleMode}
      >
        {adminMode === 'panel' ? (
          <>
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Mode
          </>
        ) : (
          <>
            <Settings className="mr-2 h-4 w-4" />
            Admin Panel
          </>
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={exitAdminMode}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};