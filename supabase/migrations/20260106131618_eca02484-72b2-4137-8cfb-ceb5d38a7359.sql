
-- Crea tabella per i capitoli del regolamento
CREATE TABLE public.regolamento_chapters (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Crea tabella per le sezioni (sottocapitoli)
CREATE TABLE public.regolamento_sections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    chapter_id UUID NOT NULL REFERENCES public.regolamento_chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.regolamento_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regolamento_sections ENABLE ROW LEVEL SECURITY;

-- Policy per lettura pubblica
CREATE POLICY "Capitoli visibili a tutti" 
ON public.regolamento_chapters 
FOR SELECT 
USING (true);

CREATE POLICY "Sezioni visibili a tutti" 
ON public.regolamento_sections 
FOR SELECT 
USING (true);

-- Policy per admin (gestione)
CREATE POLICY "Admin può gestire capitoli" 
ON public.regolamento_chapters 
FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Admin può gestire sezioni" 
ON public.regolamento_sections 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Trigger per updated_at
CREATE TRIGGER update_regolamento_chapters_updated_at
BEFORE UPDATE ON public.regolamento_chapters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_regolamento_sections_updated_at
BEFORE UPDATE ON public.regolamento_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
