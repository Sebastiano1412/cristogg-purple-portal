-- Tabella per il regolamento (contenuto singolo)
CREATE TABLE public.regolamento (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserisci riga iniziale vuota
INSERT INTO public.regolamento (content) VALUES ('');

-- Tabella per le guide
CREATE TABLE public.guides (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL DEFAULT '',
    cover_image TEXT,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Funzione per aggiornare timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger per regolamento
CREATE TRIGGER update_regolamento_updated_at
BEFORE UPDATE ON public.regolamento
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger per guide
CREATE TRIGGER update_guides_updated_at
BEFORE UPDATE ON public.guides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- RLS per regolamento (pubblico in lettura, solo autenticati per scrittura)
ALTER TABLE public.regolamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Regolamento visibile a tutti"
ON public.regolamento
FOR SELECT
USING (true);

CREATE POLICY "Solo admin può modificare regolamento"
ON public.regolamento
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- RLS per guide (pubblico solo quelle pubblicate, admin vede tutto)
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Guide pubblicate visibili a tutti"
ON public.guides
FOR SELECT
USING (published = true);

CREATE POLICY "Admin può vedere tutte le guide"
ON public.guides
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admin può gestire guide"
ON public.guides
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Storage bucket per immagini guide
INSERT INTO storage.buckets (id, name, public)
VALUES ('guide-images', 'guide-images', true);

-- Policy storage
CREATE POLICY "Immagini guide pubbliche"
ON storage.objects
FOR SELECT
USING (bucket_id = 'guide-images');

CREATE POLICY "Admin può caricare immagini"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'guide-images');

CREATE POLICY "Admin può eliminare immagini"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'guide-images');