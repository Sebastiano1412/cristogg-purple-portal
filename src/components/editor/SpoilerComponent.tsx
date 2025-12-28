import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

const SpoilerComponent = ({ node, updateAttributes, editor }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  const addParagraphAfter = () => {
    const pos = editor.view.state.selection.$anchor.end();
    editor.chain().focus().insertContentAt(pos + 1, { type: 'paragraph' }).run();
  };

  return (
    <NodeViewWrapper className="spoiler-wrapper my-4">
      <div className="border border-primary/30 rounded-lg overflow-hidden bg-card/50">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-4 py-3 bg-muted/50 hover:bg-muted/80 transition-colors text-left cursor-pointer"
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
            onKeyDown={(e) => e.stopPropagation()}
            className="bg-transparent border-none outline-none text-foreground font-medium flex-1"
            placeholder="Titolo spoiler..."
          />
        </div>
        <div className={`transition-all duration-200 ${isOpen ? 'block' : 'hidden'}`}>
          <NodeViewContent className="p-4 [&_p]:mb-2" />
        </div>
      </div>
      <button
        type="button"
        onClick={addParagraphAfter}
        contentEditable={false}
        className="w-full flex items-center justify-center gap-2 py-2 text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        <Plus className="w-3 h-3" />
        Aggiungi contenuto sotto
      </button>
    </NodeViewWrapper>
  );
};

export default SpoilerComponent;
