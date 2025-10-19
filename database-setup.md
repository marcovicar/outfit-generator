# Supabase Database Setup Instructions

## Step 1: Create Tables
Go to your Supabase dashboard → SQL Editor and run this SQL:

```sql
-- Create clothing_items table
CREATE TABLE IF NOT EXISTS clothing_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('tops', 'bottoms')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generated_outfits table
CREATE TABLE IF NOT EXISTS generated_outfits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  top_id UUID NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  bottom_id UUID NOT NULL REFERENCES clothing_items(id) ON DELETE CASCADE,
  generated_image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(top_id, bottom_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clothing_items_category ON clothing_items(category);
CREATE INDEX IF NOT EXISTS idx_generated_outfits_top_bottom ON generated_outfits(top_id, bottom_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_clothing_items_updated_at 
  BEFORE UPDATE ON clothing_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generated_outfits_updated_at 
  BEFORE UPDATE ON generated_outfits 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_outfits ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on clothing_items" ON clothing_items
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on generated_outfits" ON generated_outfits
  FOR ALL USING (true);
```

## Step 2: Create Storage Buckets
Go to Storage → Create Bucket and create these buckets:

1. **clothing-images** (public bucket)
2. **generated-outfits** (public bucket)

## Step 3: Set Storage Policies
In Storage → Policies, add these policies:

For **clothing-images** bucket:
```sql
-- Allow public read access
CREATE POLICY "Public read access for clothing images" ON storage.objects
FOR SELECT USING (bucket_id = 'clothing-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload clothing images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'clothing-images');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update clothing images" ON storage.objects
FOR UPDATE USING (bucket_id = 'clothing-images');
```

For **generated-outfits** bucket:
```sql
-- Allow public read access
CREATE POLICY "Public read access for generated outfits" ON storage.objects
FOR SELECT USING (bucket_id = 'generated-outfits');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload generated outfits" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'generated-outfits');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update generated outfits" ON storage.objects
FOR UPDATE USING (bucket_id = 'generated-outfits');
```
