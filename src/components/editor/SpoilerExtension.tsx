import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import SpoilerComponent from './SpoilerComponent';

export const Spoiler = Node.create({
  name: 'spoiler',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      title: {
        default: 'Spoiler',
        parseHTML: (element) => {
          const el = element as HTMLElement;
          return el.getAttribute('data-title') || 'Spoiler';
        },
        renderHTML: (attributes) => ({
          'data-title': attributes.title,
        }),
      },
    };
  },

  parseHTML() {
    return [
      // New format
      { tag: 'details[data-spoiler]' },
      // Legacy format
      { tag: 'div[data-spoiler]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const title = (HTMLAttributes as Record<string, any>)['data-title'] || 'Spoiler';

    return [
      'details',
      mergeAttributes(HTMLAttributes, {
        'data-spoiler': '',
        class: 'spoiler-block',
      }),
      ['summary', { contenteditable: 'false' }, title],
      ['div', { class: 'spoiler-body' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SpoilerComponent);
  },
});

export default Spoiler;

