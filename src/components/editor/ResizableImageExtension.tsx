import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImage from './ResizableImage';

export const ResizableImageExtension = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('width') || element.style.width?.replace('px', '') || null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return { width: attributes.width, style: `width: ${attributes.width}px` };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImage);
  },
});
