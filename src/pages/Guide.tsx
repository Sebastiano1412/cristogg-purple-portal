import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { BookOpen } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
}

const Guide = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      const { data } = await supabase
        .from('guides')
        .select('id, title, slug, cover_image')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (data) {
        setGuides(data);
      }
      setLoading(false);
    };

    fetchGuides();
  }, []);

  return (
    <>
      <Helmet>
        <title>Guide | Cristo.gg</title>
        <meta name="description" content="Scopri le guide del server Minecraft Cristo.gg" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="pt-32 pb-16 px-4 flex-1">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-russo text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Guide
            </h1>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : guides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Link
                    key={guide.id}
                    to={`/guide/${guide.slug}`}
                    className="group bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                  >
                    {guide.cover_image ? (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={guide.cover_image} 
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {guide.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Le guide saranno disponibili a breve.
                </p>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Guide;
