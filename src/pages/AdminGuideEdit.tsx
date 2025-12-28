import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { Save, ArrowLeft, Image } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  published: boolean;
}

const AdminGuideEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      const { data } = await supabase
        .from('guides')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setGuide(data);
      }
      setLoading(false);
    };

    fetchGuide();
  }, [id]);

  const handleSave = async () => {
    if (!guide) return;
    setSaving(true);
    
    const { error } = await supabase
      .from('guides')
      .update({
        title: guide.title,
        content: guide.content,
        cover_image: guide.cover_image,
      })
      .eq('id', guide.id);

    if (error) {
      toast.error('Errore nel salvataggio');
    } else {
      toast.success('Guida salvata');
    }
    
    setSaving(false);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !guide) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `covers/${guide.id}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('guide-images')
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error('Errore nel caricamento');
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('guide-images')
      .getPublicUrl(data.path);

    setGuide({ ...guide, cover_image: publicUrl });
    toast.success('Copertina caricata');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!guide) {
    return <div>Guida non trovata</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/guide')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Indietro
        </Button>
        <h1 className="text-3xl font-russo bg-gradient-primary bg-clip-text text-transparent flex-1">
          Modifica Guida
        </h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <span className="animate-spin mr-2">⏳</span>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Salva
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Titolo</Label>
          <Input
            id="title"
            value={guide.title}
            onChange={(e) => setGuide({ ...guide, title: e.target.value })}
            className="bg-background/50"
          />
        </div>

        <div className="space-y-2">
          <Label>Immagine di copertina</Label>
          <div className="flex items-center gap-4">
            {guide.cover_image && (
              <img 
                src={guide.cover_image} 
                alt="Cover" 
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}
            <Button
              variant="outline"
              onClick={() => coverInputRef.current?.click()}
            >
              <Image className="w-4 h-4 mr-2" />
              {guide.cover_image ? 'Cambia' : 'Carica'} copertina
            </Button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Contenuto</Label>
          <RichTextEditor
            content={guide.content}
            onChange={(content) => setGuide({ ...guide, content })}
            showImageUpload
          />
        </div>
      </div>
    </div>
  );
};

export default AdminGuideEdit;
