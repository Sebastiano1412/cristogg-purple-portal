import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, ChevronDown, Video, Youtube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRef } from 'react';
import { Spoiler } from './editor/SpoilerExtension';
import { ResizableImageExtension } from './editor/ResizableImageExtension';
import { ResizableYoutubeExtension } from './editor/ResizableYoutubeExtension';
import { Video as VideoExtension } from './editor/VideoExtension';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  showImageUpload?: boolean;
}

const RichTextEditor = ({ content, onChange, showImageUpload = false }: RichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImageExtension.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      ResizableYoutubeExtension.configure({
        width: 640,
        height: 360,
      }),
      VideoExtension,
      Spoiler,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('guide-images')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading image:', error);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('guide-images')
      .getPublicUrl(data.path);

    editor.chain().focus().setImage({ src: publicUrl }).run();
  };

  const addLink = () => {
    const url = prompt('Inserisci URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addSpoiler = () => {
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: 'spoiler',
          attrs: { title: 'Spoiler' },
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Contenuto...' }] }],
        },
        { type: 'paragraph' },
      ])
      .run();
  };

  const addYoutubeVideo = () => {
    const url = prompt('Inserisci URL YouTube:');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('guide-videos')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading video:', error);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('guide-videos')
      .getPublicUrl(data.path);

    editor.commands.setVideo({ src: publicUrl });
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 bg-card border-b border-border">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-primary/20' : ''}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-primary/20' : ''}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary/20' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary/20' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-primary/20' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-primary/20' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={addLink}
          className={editor.isActive('link') ? 'bg-primary/20' : ''}
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={addSpoiler}
          title="Aggiungi Spoiler"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={addYoutubeVideo}
          title="Aggiungi Video YouTube"
        >
          <Youtube className="w-4 h-4" />
        </Button>
        {showImageUpload && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => videoInputRef.current?.click()}
              title="Carica Video"
            >
              <Video className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="Carica Immagine"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </>
        )}
      </div>
      <EditorContent 
        editor={editor} 
        className="p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-4 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_p]:mb-3"
      />
    </div>
  );
};

export default RichTextEditor;
