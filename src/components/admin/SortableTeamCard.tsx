import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';

interface SortableTeamCardProps {
  id: string;
  children: ReactNode;
  isEditMode: boolean;
}

export const SortableTeamCard = ({ id, children, isEditMode }: SortableTeamCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEditMode });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {isEditMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 z-10 cursor-grab active:cursor-grabbing bg-primary/10 p-1 rounded hover:bg-primary/20 transition-colors"
        >
          <GripVertical className="h-4 w-4 text-primary" />
        </div>
      )}
      {children}
    </div>
  );
};
