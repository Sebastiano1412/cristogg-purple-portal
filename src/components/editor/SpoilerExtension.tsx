import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import SpoilerComponent from './SpoilerComponent';

export const Spoiler = Node.create({
  name: 'spoiler',
  group: 'block',
  content: 'block+',
  defining: true,
  isolating: false,
  
  addAttributes() {
    return {
      title: {
        default: 'Spoiler',
        parseHTML: element => element.getAttribute('data-title') || 'Spoiler',
        renderHTML: attributes => ({
          'data-title': attributes.title,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-spoiler]',
        getAttrs: element => ({
          title: (element as HTMLElement).getAttribute('data-title') || 'Spoiler',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 
      'data-spoiler': '', 
      'data-title': HTMLAttributes['data-title'] || 'Spoiler',
      class: 'spoiler-block' 
    }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SpoilerComponent);
  },

  addKeyboardShortcuts() {
    return {
      // Allow exiting the spoiler with Enter at the end
      'Mod-Enter': () => {
        return this.editor.commands.exitCode();
      },
    };
  },
});

export default Spoiler;
