import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useCallback } from 'react';

const ResizableImage = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: 'se' | 'sw') => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = node.attrs.width || 400;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = direction === 'se' 
        ? moveEvent.clientX - startX 
        : startX - moveEvent.clientX;
      const newWidth = Math.max(100, Math.min(800, startWidth + deltaX));
      updateAttributes({ width: newWidth });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [node.attrs.width, updateAttributes]);

  return (
    <NodeViewWrapper className="relative inline-block my-2">
      <div 
        className={`relative inline-block ${selected ? 'ring-2 ring-primary' : ''}`}
        style={{ width: node.attrs.width || 'auto' }}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          className="rounded-lg max-w-full"
          style={{ width: '100%', height: 'auto' }}
          draggable={false}
        />
        {selected && (
          <>
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-primary cursor-se-resize rounded-tl-sm"
              onMouseDown={(e) => handleMouseDown(e, 'se')}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 bg-primary cursor-sw-resize rounded-tr-sm"
              onMouseDown={(e) => handleMouseDown(e, 'sw')}
            />
          </>
        )}
      </div>
      {selected && (
        <div className="text-xs text-muted-foreground mt-1 text-center">
          {Math.round(node.attrs.width || 400)}px
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default ResizableImage;
