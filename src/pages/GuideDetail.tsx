import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
}

const GuideDetail = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      const { data } = await supabase
        .from('guides')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      
      if (data) {
        setGuide(data);
      }
      setLoading(false);
    };

    fetchGuide();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16 px-4 text-center">
          <h1 className="text-2xl text-foreground mb-4">Guida non trovata</h1>
          <Link to="/guide" className="text-primary hover:underline">
            Torna alle guide
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{guide.title} | Cristo.gg</title>
        <meta name="description" content={`Guida: ${guide.title}`} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/guide" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alle guide
            </Link>

            {guide.cover_image && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                <img 
                  src={guide.cover_image} 
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-russo mb-8 bg-gradient-primary bg-clip-text text-transparent">
              {guide.title}
            </h1>
            
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GuideDetail;
