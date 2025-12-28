import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import SpoilerRenderer from '@/components/SpoilerRenderer';

const Regolamento = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Helmet>
        <title>Regolamento | Cristo.gg</title>
        <meta name="description" content="Leggi il regolamento del server Minecraft Cristo.gg" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-russo text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Regolamento
            </h1>
            
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : content ? (
                <SpoilerRenderer content={content} />
              ) : (
                <p className="text-muted-foreground text-center">
                  Il regolamento sarà disponibile a breve.
                </p>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Regolamento;
