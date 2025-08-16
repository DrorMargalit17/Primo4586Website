import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, Edit3 } from 'lucide-react';
import { useAdminMode } from '@/hooks/useAdminMode';
import { useNavigate } from 'react-router-dom';

interface AdminModeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdminModeSelector = ({ open, onOpenChange }: AdminModeSelectorProps) => {
  const { setAdminMode } = useAdminMode();
  const navigate = useNavigate();

  const handleSelectMode = (mode: 'panel' | 'edit') => {
    setAdminMode(mode);
    onOpenChange(false);
    
    if (mode === 'panel') {
      navigate('/admin');
    } else {
      // Stay on current page for edit mode
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Admin Mode</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => handleSelectMode('panel')}
            className="h-16 flex flex-col gap-2"
          >
            <Settings className="h-6 w-6" />
            <span>Admin Panel</span>
            <span className="text-xs text-muted-foreground">Manage events, activities, and content</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSelectMode('edit')}
            className="h-16 flex flex-col gap-2"
          >
            <Edit3 className="h-6 w-6" />
            <span>Edit Mode</span>
            <span className="text-xs text-muted-foreground">Edit text directly on pages</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};