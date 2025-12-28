import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import SpoilerComponent from './SpoilerComponent';

export const Spoiler = Node.create({
  name: 'spoiler',
  group: 'block',
  content: 'block+',
  
  addAttributes() {
    return {
      title: {
        default: 'Spoiler',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-spoiler]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-spoiler': '', class: 'spoiler-block' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SpoilerComponent);
  },
});

export default Spoiler;
