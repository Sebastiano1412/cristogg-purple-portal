import Youtube from '@tiptap/extension-youtube';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableYoutube from './ResizableYoutube';

export const ResizableYoutubeExtension = Youtube.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ResizableYoutube);
  },
});
