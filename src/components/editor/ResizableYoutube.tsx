import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useCallback } from 'react';

const ResizableYoutube = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: 'se' | 'sw') => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = node.attrs.width || 640;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = direction === 'se' 
        ? moveEvent.clientX - startX 
        : startX - moveEvent.clientX;
      const newWidth = Math.max(200, Math.min(1200, startWidth + deltaX));
      const newHeight = Math.round(newWidth * 9 / 16);
      updateAttributes({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [node.attrs.width, updateAttributes]);

  const getYoutubeId = (src: string) => {
    const match = src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(node.attrs.src || '');
  const width = node.attrs.width || 640;
  const height = node.attrs.height || 360;

  return (
    <NodeViewWrapper className="relative my-4">
      <div 
        className={`relative ${selected ? 'ring-2 ring-primary' : ''}`}
        style={{ width, maxWidth: '100%' }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          width={width}
          height={height}
          className="rounded-lg"
          style={{ maxWidth: '100%' }}
          allowFullScreen
        />
        {selected && (
          <>
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-primary cursor-se-resize rounded-tl-sm"
              onMouseDown={(e) => handleMouseDown(e, 'se')}
            />
            <div
              className="absolute bottom-0 left-0 w-5 h-5 bg-primary cursor-sw-resize rounded-tr-sm"
              onMouseDown={(e) => handleMouseDown(e, 'sw')}
            />
          </>
        )}
      </div>
      {selected && (
        <div className="text-xs text-muted-foreground mt-1">
          {width} x {height}px
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default ResizableYoutube;
