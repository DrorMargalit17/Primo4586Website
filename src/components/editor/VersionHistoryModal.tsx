import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw, Clock } from 'lucide-react';

interface ContentVersion {
  id: string;
  content: string;
  version_number: number;
  created_at: string;
  created_by: string | null;
}

interface VersionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentKey: string;
  pagePath: string;
  onRestore: (content: string) => void;
}

export const VersionHistoryModal = ({
  open,
  onOpenChange,
  contentKey,
  pagePath,
  onRestore
}: VersionHistoryModalProps) => {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [currentContent, setCurrentContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadVersionHistory();
    }
  }, [open, contentKey, pagePath]);

  const loadVersionHistory = async () => {
    setLoading(true);
    try {
      // Get current content
      const { data: currentData, error: currentError } = await supabase
        .from('editable_content')
        .select('content')
        .eq('key', contentKey)
        .eq('page_path', pagePath)
        .single();

      if (currentError) {
        console.error('Error loading current content:', currentError);
      } else {
        setCurrentContent(currentData?.content || '');
      }

      // Get version history
      const { data: versionData, error: versionError } = await supabase
        .from('content_versions')
        .select(`
          id,
          content,
          version_number,
          created_at,
          created_by,
          editable_content!inner(key, page_path)
        `)
        .eq('editable_content.key', contentKey)
        .eq('editable_content.page_path', pagePath)
        .order('version_number', { ascending: false });

      if (versionError) {
        console.error('Error loading version history:', versionError);
        toast({
          title: "Error",
          description: "Failed to load version history",
          variant: "destructive",
        });
      } else {
        setVersions(versionData || []);
      }
    } catch (error) {
      console.error('Error in loadVersionHistory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (version: ContentVersion) => {
    try {
      const { error } = await supabase
        .from('editable_content')
        .update({ content: version.content })
        .eq('key', contentKey)
        .eq('page_path', pagePath);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to restore version: " + error.message,
          variant: "destructive",
        });
        return;
      }

      onRestore(version.content);
      toast({
        title: "Success",
        description: `Restored to version ${version.version_number}`,
      });
    } catch (error) {
      console.error('Error restoring version:', error);
      toast({
        title: "Error",
        description: "Failed to restore version",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Version History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Version */}
          <div className="border rounded-lg p-4 bg-surface-elevated">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="default">Current</Badge>
                <span className="text-sm text-muted-foreground">Latest version</span>
              </div>
            </div>
            <div className="text-sm bg-background rounded p-2 max-h-20 overflow-y-auto">
              {currentContent || 'No content'}
            </div>
          </div>

          {/* Version History */}
          <ScrollArea className="max-h-96">
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-4 text-muted-foreground">
                  Loading version history...
                </div>
              ) : versions.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No previous versions found
                </div>
              ) : (
                versions.map((version) => (
                  <div key={version.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Version {version.version_number}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(version.created_at)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestore(version)}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Restore
                      </Button>
                    </div>
                    <div className="text-sm bg-background rounded p-2 max-h-20 overflow-y-auto">
                      {version.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};