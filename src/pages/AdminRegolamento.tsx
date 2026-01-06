import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { Save, Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

interface SortableChapterProps {
  chapter: Chapter;
  chapterIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  onUpdateTitle: (title: string) => void;
  onDelete: () => void;
  onAddSection: () => void;
  onUpdateSectionTitle: (sectionId: string, title: string) => void;
  onUpdateSectionContent: (sectionId: string, content: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (oldIndex: number, newIndex: number) => void;
}

const SortableSection = ({
  section,
  chapterIndex,
  sectionIndex,
  onUpdateTitle,
  onUpdateContent,
  onDelete,
}: {
  section: Section;
  chapterIndex: number;
  sectionIndex: number;
  onUpdateTitle: (title: string) => void;
  onUpdateContent: (content: string) => void;
  onDelete: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-border rounded-lg p-4 space-y-3 bg-card"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-primary font-medium">
          {chapterIndex + 1}.{sectionIndex + 1}
        </span>
        <Input
          value={section.title}
          onChange={(e) => onUpdateTitle(e.target.value)}
          className="flex-1"
          placeholder="Titolo sezione"
        />
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
      <RichTextEditor
        content={section.content}
        onChange={onUpdateContent}
      />
    </div>
  );
};

const SortableChapter = ({
  chapter,
  chapterIndex,
  isOpen,
  onToggle,
  onUpdateTitle,
  onDelete,
  onAddSection,
  onUpdateSectionTitle,
  onUpdateSectionContent,
  onDeleteSection,
  onReorderSections,
}: SortableChapterProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = chapter.sections.findIndex((s) => s.id === active.id);
      const newIndex = chapter.sections.findIndex((s) => s.id === over.id);
      onReorderSections(oldIndex, newIndex);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <div className="flex items-center gap-3 p-4 bg-muted/50">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>
          <span className="text-primary font-bold">{chapterIndex + 1}.</span>
          <Input
            value={chapter.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="flex-1 font-semibold"
            placeholder="Titolo capitolo"
          />
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon">
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>

        <CollapsibleContent>
          <div className="p-4 space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSectionDragEnd}
            >
              <SortableContext
                items={chapter.sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {chapter.sections.map((section, sectionIndex) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    chapterIndex={chapterIndex}
                    sectionIndex={sectionIndex}
                    onUpdateTitle={(title) => onUpdateSectionTitle(section.id, title)}
                    onUpdateContent={(content) => onUpdateSectionContent(section.id, content)}
                    onDelete={() => onDeleteSection(section.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <Button variant="outline" size="sm" onClick={onAddSection}>
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi Sezione
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const AdminRegolamento = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

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
      setOpenChapters(new Set(chaptersData.map(c => c.id)));
    }
    setLoading(false);
  };

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `temp-${Date.now()}`,
      title: 'Nuovo Capitolo',
      order_index: chapters.length,
      sections: []
    };
    setChapters([...chapters, newChapter]);
    setOpenChapters(prev => new Set([...prev, newChapter.id]));
  };

  const addSection = (chapterId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          sections: [...chapter.sections, {
            id: `temp-${Date.now()}`,
            chapter_id: chapterId,
            title: 'Nuova Sezione',
            content: '',
            order_index: chapter.sections.length
          }]
        };
      }
      return chapter;
    }));
  };

  const updateChapterTitle = (chapterId: string, title: string) => {
    setChapters(chapters.map(chapter =>
      chapter.id === chapterId ? { ...chapter, title } : chapter
    ));
  };

  const updateSectionTitle = (chapterId: string, sectionId: string, title: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          sections: chapter.sections.map(section =>
            section.id === sectionId ? { ...section, title } : section
          )
        };
      }
      return chapter;
    }));
  };

  const updateSectionContent = (chapterId: string, sectionId: string, content: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          sections: chapter.sections.map(section =>
            section.id === sectionId ? { ...section, content } : section
          )
        };
      }
      return chapter;
    }));
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(c => c.id !== chapterId));
  };

  const deleteSection = (chapterId: string, sectionId: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          sections: chapter.sections.filter(s => s.id !== sectionId)
        };
      }
      return chapter;
    }));
  };

  const handleChapterDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = chapters.findIndex((c) => c.id === active.id);
      const newIndex = chapters.findIndex((c) => c.id === over.id);
      setChapters(arrayMove(chapters, oldIndex, newIndex));
    }
  };

  const handleSectionReorder = (chapterId: string, oldIndex: number, newIndex: number) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          sections: arrayMove(chapter.sections, oldIndex, newIndex)
        };
      }
      return chapter;
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      await supabase.from('regolamento_sections').delete().not('id', 'is', null);
      await supabase.from('regolamento_chapters').delete().not('id', 'is', null);

      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        const { data: newChapter, error: chapterError } = await supabase
          .from('regolamento_chapters')
          .insert({ title: chapter.title, order_index: i })
          .select()
          .single();

        if (chapterError) throw chapterError;

        for (let j = 0; j < chapter.sections.length; j++) {
          const section = chapter.sections[j];
          const { error: sectionError } = await supabase
            .from('regolamento_sections')
            .insert({
              chapter_id: newChapter.id,
              title: section.title,
              content: section.content,
              order_index: j
            });

          if (sectionError) throw sectionError;
        }
      }

      toast.success('Regolamento salvato');
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Errore nel salvataggio');
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
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-russo bg-gradient-primary bg-clip-text text-transparent">
          Modifica Regolamento
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addChapter}>
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi Capitolo
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salva
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleChapterDragEnd}
      >
        <SortableContext
          items={chapters.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {chapters.map((chapter, chapterIndex) => (
              <SortableChapter
                key={chapter.id}
                chapter={chapter}
                chapterIndex={chapterIndex}
                isOpen={openChapters.has(chapter.id)}
                onToggle={() => toggleChapter(chapter.id)}
                onUpdateTitle={(title) => updateChapterTitle(chapter.id, title)}
                onDelete={() => deleteChapter(chapter.id)}
                onAddSection={() => addSection(chapter.id)}
                onUpdateSectionTitle={(sectionId, title) =>
                  updateSectionTitle(chapter.id, sectionId, title)
                }
                onUpdateSectionContent={(sectionId, content) =>
                  updateSectionContent(chapter.id, sectionId, content)
                }
                onDeleteSection={(sectionId) => deleteSection(chapter.id, sectionId)}
                onReorderSections={(oldIndex, newIndex) =>
                  handleSectionReorder(chapter.id, oldIndex, newIndex)
                }
              />
            ))}

            {chapters.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nessun capitolo. Clicca "Aggiungi Capitolo" per iniziare.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default AdminRegolamento;
