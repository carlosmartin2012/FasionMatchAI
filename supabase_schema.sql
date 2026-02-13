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

-- Subscriptions Table (Premium/Gold features)
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('active', 'inactive', 'trial')),
  plan_type TEXT CHECK (plan_type IN ('basic', 'premium', 'gold')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Height Matches (AI Factor Altura System)
CREATE TABLE height_matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  matched_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  match_score FLOAT, -- How well they match in style and height proportions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User Interactions (Recommendations/Analytics)
CREATE TABLE user_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES wardrobe_items(id) ON DELETE CASCADE,
  interaction_type TEXT CHECK (interaction_type IN ('view', 'like', 'wear', 'dismiss')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE height_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Policies: Users can see/edit their own data
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own wardrobe" ON wardrobe_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own wardrobe" ON wardrobe_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own daily picks" ON daily_picks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own height matches" ON height_matches FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own interactions" ON user_interactions FOR ALL USING (auth.uid() = user_id);

-- Factor Altura: Find similar users by height
CREATE OR REPLACE FUNCTION find_height_matches(user_height TEXT)
RETURNS TABLE (profile_id UUID, nickname TEXT, height TEXT, match_score FLOAT) AS $$
BEGIN
  RETURN QUERY
  SELECT id, nickname, height, 1.0 - (ABS(height::float - user_height::float) / 20.0) as match_score
  FROM profiles
  WHERE id != auth.uid()
  AND height IS NOT NULL
  AND ABS(height::float - user_height::float) < 10.0 -- Within 10cm
  ORDER BY match_score DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recommendation matching based on style tags
CREATE OR REPLACE FUNCTION match_wardrobe_items(target_tags TEXT[])
RETURNS SETOF wardrobe_items AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM wardrobe_items
  WHERE style_tags && target_tags -- Overlap in tags
  AND user_id = auth.uid()
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
