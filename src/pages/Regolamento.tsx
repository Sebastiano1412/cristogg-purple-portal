import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import SpoilerRenderer from '@/components/SpoilerRenderer';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  chapter_id: string;
  title: string;
  content: string;
  order_index: number;
}

interface Chapter {
  id: string;
  title: string;
  order_index: number;
  sections: Section[];
}

const Regolamento = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: chaptersData } = await supabase
        .from('regolamento_chapters')
        .select('*')
        .order('order_index');

      const { data: sectionsData } = await supabase
        .from('regolamento_sections')
        .select('*')
        .order('order_index');

      if (chaptersData) {
        const chaptersWithSections = chaptersData.map(chapter => ({
          ...chapter,
          sections: sectionsData?.filter(s => s.chapter_id === chapter.id) || []
        }));
        setChapters(chaptersWithSections);
        if (chaptersData.length > 0) {
          setActiveChapter(chaptersData[0].id);
        }

        // Trova la data di ultimo aggiornamento
        const allDates = [
          ...chaptersData.map(c => c.updated_at),
          ...(sectionsData?.map(s => s.updated_at) || [])
        ];
        if (allDates.length > 0) {
          const latest = allDates.sort().reverse()[0];
          setLastUpdated(new Date(latest).toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }));
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const activeChapterData = chapters.find(c => c.id === activeChapter);
  const activeChapterIndex = chapters.findIndex(c => c.id === activeChapter);

  return (
    <>
      <Helmet>
        <title>Regolamento | Cristo.gg</title>
        <meta name="description" content="Leggi il regolamento del server Minecraft Cristo.gg" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-russo mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Regolamento del Server
              </h1>
              <p className="text-muted-foreground">
                Regole e linee guida per mantenere Cristo.gg un ambiente piacevole per tutti.
              </p>
              {lastUpdated && (
                <p className="text-sm text-muted-foreground mt-2">
                  Ultimo aggiornamento: {lastUpdated}
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : chapters.length === 0 ? (
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8">
                <p className="text-muted-foreground text-center">
                  Il regolamento sarà disponibile a breve.
                </p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-72 shrink-0">
                  <nav className="lg:sticky lg:top-32 space-y-1">
                    {chapters.map((chapter, index) => (
                      <button
                        key={chapter.id}
                        onClick={() => setActiveChapter(chapter.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg transition-all text-sm",
                          activeChapter === chapter.id
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {index + 1}. {chapter.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {activeChapterData && (
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-russo mb-8 text-foreground">
                        {activeChapterIndex + 1}. {activeChapterData.title}
                      </h2>

                      <div className="space-y-8">
                        {activeChapterData.sections.map((section, sectionIndex) => (
                          <div key={section.id} className="border-l-2 border-primary/30 pl-6">
                            <h3 className="text-lg font-semibold mb-3 text-foreground">
                              <span className="text-primary mr-2">
                                {activeChapterIndex + 1}.{sectionIndex + 1}
                              </span>
                              {section.title}
                            </h3>
                            <div className="text-muted-foreground">
                              <SpoilerRenderer content={section.content} />
                            </div>
                          </div>
                        ))}

                        {activeChapterData.sections.length === 0 && (
                          <p className="text-muted-foreground italic">
                            Nessuna sezione in questo capitolo.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Regolamento;
