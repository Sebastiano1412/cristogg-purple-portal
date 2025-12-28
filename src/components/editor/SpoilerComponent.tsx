import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const SpoilerComponent = ({ node, updateAttributes }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NodeViewWrapper className="spoiler-wrapper my-4">
      <div className="border border-primary/30 rounded-lg overflow-hidden bg-card/50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          contentEditable={false}
          className="w-full flex items-center gap-2 px-4 py-3 bg-muted/50 hover:bg-muted/80 transition-colors text-left"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-primary shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-primary shrink-0" />
          )}
          <input
            type="text"
            value={node.attrs.title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent border-none outline-none text-foreground font-medium flex-1"
            placeholder="Titolo spoiler..."
          />
        </button>
        <div className={`transition-all duration-200 ${isOpen ? 'block' : 'hidden'}`}>
          <NodeViewContent className="p-4 [&_p]:mb-2" />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default SpoilerComponent;
