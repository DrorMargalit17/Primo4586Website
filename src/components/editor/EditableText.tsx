import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useAdminMode } from '@/hooks/useAdminMode';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Edit3, Save, X, History } from 'lucide-react';
import { VersionHistoryModal } from './VersionHistoryModal';

interface EditableTextProps {
  contentKey: string;
  defaultContent: string;
  contentType?: 'text' | 'heading' | 'paragraph';
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children?: React.ReactNode;
}

export const EditableText = ({ 
  contentKey, 
  defaultContent, 
  contentType = 'text',
  className = '',
  tag = 'span',
  children 
}: EditableTextProps) => {
  const { isAdmin } = useAuth();
  const { isEditMode } = useAdminMode();
  const { toast } = useToast();
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(defaultContent);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pagePath = window.location.pathname;

  // Load content from database on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('editable_content')
          .select('content')
          .eq('key', contentKey)
          .eq('page_path', pagePath)
          .maybeSingle();

        if (error) {
          console.error('Error loading content:', error);
          return;
        }

        if (data) {
          setContent(data.content);
          setEditValue(data.content);
        }
      } catch (error) {
        console.error('Error in loadContent:', error);
      }
    };

    loadContent();
  }, [contentKey, pagePath]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      if (contentType === 'paragraph') {
        textareaRef.current?.focus();
      } else {
        inputRef.current?.focus();
      }
    }
  }, [isEditing, contentType]);

  const handleSave = async () => {
    if (!isAdmin) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('editable_content')
        .upsert({
          key: contentKey,
          content: editValue,
          content_type: contentType,
          page_path: pagePath,
        }, {
          onConflict: 'key'
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save changes: " + error.message,
          variant: "destructive",
        });
        return;
      }

      setContent(editValue);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Content updated successfully!",
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const handleRestore = (restoredContent: string) => {
    setContent(restoredContent);
    setEditValue(restoredContent);
    setShowHistory(false);
  };

  // If not admin or not in edit mode, just render the content normally
  if (!isAdmin || !isEditMode) {
    const Tag = tag as keyof JSX.IntrinsicElements;
    return (
      <Tag className={className}>
        {children ? children : content}
      </Tag>
    );
  }

  // Admin editing interface
  if (isEditing) {
    return (
      <div className="relative group">
        <div className="space-y-2">
          {contentType === 'paragraph' ? (
            <Textarea
              ref={textareaRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`min-h-[100px] ${className}`}
              placeholder="Enter content..."
            />
          ) : (
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={className}
              placeholder="Enter content..."
            />
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={loading}
            >
              <Save className="h-3 w-3 mr-1" />
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Admin view mode
  const Tag = tag as keyof JSX.IntrinsicElements;
  return (
    <div className="relative group">
      <Tag className={`${className} ${isAdmin && isEditMode ? 'border-2 border-dashed border-transparent hover:border-primary/50 transition-colors' : ''}`}>
        {children ? children : content}
      </Tag>
      
      {isAdmin && isEditMode && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="h-6 w-6 p-0"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowHistory(true)}
            className="h-6 w-6 p-0"
          >
            <History className="h-3 w-3" />
          </Button>
        </div>
      )}

      <VersionHistoryModal
        open={showHistory}
        onOpenChange={setShowHistory}
        contentKey={contentKey}
        pagePath={pagePath}
        onRestore={handleRestore}
      />
    </div>
  );
};