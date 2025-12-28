import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const AdminRegolamento = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRegolamento = async () => {
      const { data } = await supabase
        .from('regolamento')
        .select('content')
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchRegolamento();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    
    const { error } = await supabase
      .from('regolamento')
      .update({ content })
      .not('id', 'is', null);

    if (error) {
      toast.error('Errore nel salvataggio');
    } else {
      toast.success('Regolamento salvato');
    }
    
    setSaving(false);
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
          Modifica Regolamento
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

      <RichTextEditor content={content} onChange={setContent} />
    </div>
  );
};

export default AdminRegolamento;
