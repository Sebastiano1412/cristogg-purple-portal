-- Create storage bucket for video uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('guide-videos', 'guide-videos', true);

-- Allow public read access to videos
CREATE POLICY "Public video access"
ON storage.objects FOR SELECT
USING (bucket_id = 'guide-videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'guide-videos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their videos
CREATE POLICY "Authenticated users can delete videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'guide-videos' AND auth.role() = 'authenticated');