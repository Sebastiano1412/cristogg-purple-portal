import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

const SpoilerComponent = ({ node, updateAttributes, editor, getPos }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  const addParagraphAfter = () => {
    const pos = typeof getPos === 'function' ? getPos() : null;
    if (typeof pos !== 'number') return;

    const insertPos = pos + node.nodeSize;
    editor
      .chain()
      .focus()
      .insertContentAt(insertPos, { type: 'paragraph' })
      .setTextSelection(insertPos + 1)
      .run();
  };

  return (
    <NodeViewWrapper className="spoiler-wrapper my-4" data-spoiler>
      <div className="border border-primary/30 rounded-lg overflow-hidden bg-card/50">
        <div
          className="w-full flex items-center gap-2 px-4 py-3 bg-muted/50 hover:bg-muted/80 transition-colors text-left"
          contentEditable={false}
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 text-primary"
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          <input
            type="text"
            value={node.attrs.title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            className="bg-transparent border-none outline-none text-foreground font-medium flex-1"
            placeholder="Titolo spoiler..."
          />
        </div>

        {/* contentDOM must remain mounted */}
        <div className={isOpen ? 'block' : 'hidden'}>
          <NodeViewContent className="p-4 [&_p]:mb-2" />
        </div>
      </div>

      <button
        type="button"
        onClick={addParagraphAfter}
        contentEditable={false}
        className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        <Plus className="w-3 h-3" />
        Scrivi sotto lo spoiler
      </button>
    </NodeViewWrapper>
  );
};

export default SpoilerComponent;
