import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface Guide {
  id: string;
  title: string;
  slug: string;
  published: boolean;
}

const AdminGuide = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const fetchGuides = async () => {
    const { data } = await supabase
      .from('guides')
      .select('id, title, slug, published')
      .order('created_at', { ascending: false });
    
    if (data) {
      setGuides(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const createGuide = async () => {
    if (!newTitle.trim()) return;

    const slug = newTitle.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const { data, error } = await supabase
      .from('guides')
      .insert({ title: newTitle, slug })
      .select()
      .single();

    if (error) {
      toast.error('Errore nella creazione');
      return;
    }

    toast.success('Guida creata');
    setNewTitle('');
    setShowCreate(false);
    fetchGuides();
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from('guides')
      .update({ published: !currentState })
      .eq('id', id);

    if (error) {
      toast.error('Errore');
      return;
    }

    toast.success(currentState ? 'Guida nascosta' : 'Guida pubblicata');
    fetchGuides();
  };

  const deleteGuide = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa guida?')) return;

    const { error } = await supabase
      .from('guides')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Errore nella rimozione');
      return;
    }

    toast.success('Guida eliminata');
    fetchGuides();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-russo bg-gradient-primary bg-clip-text text-transparent">
          Gestione Guide
        </h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuova Guida
        </Button>
      </div>

      {showCreate && (
        <div className="bg-card/50 border border-primary/20 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Crea nuova guida</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Titolo guida"
              className="flex-1 px-4 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:border-primary"
            />
            <Button onClick={createGuide}>Crea</Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Annulla
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-card/50 border border-primary/20 rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">{guide.title}</h3>
              <p className="text-sm text-muted-foreground">/{guide.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => togglePublish(guide.id, guide.published)}
                title={guide.published ? 'Nascondi' : 'Pubblica'}
              >
                {guide.published ? (
                  <Eye className="w-4 h-4 text-green-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
              <Link to={`/admin/guide/${guide.id}`}>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteGuide(guide.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        {guides.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nessuna guida creata
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGuide;
