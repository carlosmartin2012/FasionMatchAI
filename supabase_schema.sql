-- FashionMatch AI: Core Database Schema

-- Users Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  nickname TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'basic' CHECK (plan IN ('basic', 'premium', 'gold')),
  style_tags TEXT[],
  is_private BOOLEAN DEFAULT false,
  height TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Wardrobe Items Table
CREATE TABLE wardrobe_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT,
  style TEXT,
  material TEXT,
  brand TEXT,
  shop_link TEXT,
  sku TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Daily Picks / Recommendations (Gold Feature)
CREATE TABLE daily_picks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  occasion TEXT, -- e.g., 'Casual Morning'
  description TEXT,
  item_ids UUID[], -- Array of references to wardrobe_items
  created_at DATE DEFAULT CURRENT_DATE
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_picks ENABLE ROW LEVEL SECURITY;

-- Policies: Users can see/edit their own data
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own wardrobe" ON wardrobe_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own wardrobe" ON wardrobe_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own daily picks" ON daily_picks FOR SELECT USING (auth.uid() = user_id);
