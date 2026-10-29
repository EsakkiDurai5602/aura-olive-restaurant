-- ============================================================================
-- SUPABASE DATABASE SCHEMA: AURA & OLIVE RESTAURANT RESERVATION PLATFORM
-- ============================================================================
-- HOW TO RUN IN SUPABASE:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project
-- 3. In the left navigation, click "SQL Editor"
-- 4. Click "New Query" (blank tab)
-- 5. Copy and paste THIS ENTIRE FILE (Ctrl+A, Ctrl+C -> Ctrl+V)
-- 6. Click the green "RUN" button
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Restaurant Tables Table
CREATE TABLE IF NOT EXISTS public.restaurant_tables (
    id TEXT PRIMARY KEY,
    table_number INTEGER NOT NULL UNIQUE,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    zone TEXT NOT NULL CHECK (zone IN ('main_hall', 'outdoor_terrace', 'skyline_rooftop', 'vip_cellar')),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'occupied', 'maintenance')),
    features TEXT[] DEFAULT '{}',
    shape TEXT NOT NULL DEFAULT 'rect' CHECK (shape IN ('round', 'rect', 'booth')),
    x NUMERIC NOT NULL,
    y NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Menu Items Table
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL,
    dietary_tags TEXT[] DEFAULT '{}',
    image_url TEXT NOT NULL,
    calories INTEGER,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_chef_special BOOLEAN NOT NULL DEFAULT false,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT NOT NULL,
    guest_count INTEGER NOT NULL CHECK (guest_count > 0),
    reservation_date DATE NOT NULL,
    reservation_time TEXT NOT NULL,
    zone TEXT NOT NULL,
    table_id TEXT REFERENCES public.restaurant_tables(id) ON DELETE RESTRICT,
    table_number INTEGER,
    occasion TEXT,
    special_requests TEXT,
    add_ons JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'seated', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    visit_type TEXT NOT NULL,
    food_rating NUMERIC(2, 1) DEFAULT 5.0,
    ambiance_rating NUMERIC(2, 1) DEFAULT 5.0,
    service_rating NUMERIC(2, 1) DEFAULT 5.0,
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (IDEMPOTENT SAFE WITH DROP)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert profile" ON public.profiles;
CREATE POLICY "Users can insert profile" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update profile" ON public.profiles;
CREATE POLICY "Users can update profile" ON public.profiles FOR UPDATE USING (true);

-- Restaurant Tables Policies
DROP POLICY IF EXISTS "Public read restaurant_tables" ON public.restaurant_tables;
CREATE POLICY "Public read restaurant_tables" ON public.restaurant_tables FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public update restaurant_tables" ON public.restaurant_tables;
CREATE POLICY "Public update restaurant_tables" ON public.restaurant_tables FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Staff manage tables" ON public.restaurant_tables;
CREATE POLICY "Staff manage tables" ON public.restaurant_tables FOR ALL USING (true);

-- Menu Items Policies
DROP POLICY IF EXISTS "Public read menu_items" ON public.menu_items;
CREATE POLICY "Public read menu_items" ON public.menu_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff manage menu_items" ON public.menu_items;
CREATE POLICY "Staff manage menu_items" ON public.menu_items FOR ALL USING (true);

-- Reservations Policies
DROP POLICY IF EXISTS "Public read reservations" ON public.reservations;
CREATE POLICY "Public read reservations" ON public.reservations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create reservations" ON public.reservations;
CREATE POLICY "Anyone can create reservations" ON public.reservations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update reservations" ON public.reservations;
CREATE POLICY "Public update reservations" ON public.reservations FOR UPDATE USING (true);

-- Reviews Policies
DROP POLICY IF EXISTS "Public read reviews" ON public.reviews;
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- ============================================================================
-- INITIAL SEED DATA (EACH ROW IS AN ATOMIC SAFE INSERT)
-- ============================================================================

-- Main Dining Hall Tables
INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-101', 1, 2, 'main_hall', 'available', ARRAY['Window View', 'Cozy High Table'], 'round', 18, 22)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-102', 2, 2, 'main_hall', 'available', ARRAY['Window View', 'Direct Natural Light'], 'round', 18, 45)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-103', 3, 4, 'main_hall', 'available', ARRAY['Centerpiece View', 'Spacious Seating'], 'rect', 42, 25)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-104', 4, 4, 'main_hall', 'reserved', ARRAY['Open Kitchen Sightline', 'Plush Cushions'], 'rect', 42, 50)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-105', 5, 6, 'main_hall', 'available', ARRAY['Family Table', 'Near Hearth'], 'rect', 42, 75)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-106', 6, 8, 'main_hall', 'available', ARRAY['Grand Banquet', 'Chandelier Overhead'], 'rect', 74, 35)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-107', 7, 4, 'main_hall', 'occupied', ARRAY['Corner Booth', 'Quiet Acoustic'], 'booth', 74, 68)
ON CONFLICT (id) DO NOTHING;

-- Garden Terrace Tables
INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-201', 11, 2, 'outdoor_terrace', 'available', ARRAY['Under Olive Tree', 'Fairy Lights'], 'round', 20, 28)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-202', 12, 2, 'outdoor_terrace', 'available', ARRAY['Water Fountain Vista', 'Heated Lamp'], 'round', 20, 62)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-203', 13, 4, 'outdoor_terrace', 'available', ARRAY['Floral Pergola', 'Garden Breeze'], 'rect', 48, 32)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-204', 14, 4, 'outdoor_terrace', 'reserved', ARRAY['Courtyard Center', 'Sunset Facing'], 'rect', 48, 68)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-205', 15, 6, 'outdoor_terrace', 'available', ARRAY['Veranda Nook', 'Overhead Canopy'], 'rect', 76, 48)
ON CONFLICT (id) DO NOTHING;

-- Skyline Rooftop Tables
INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-301', 21, 2, 'skyline_rooftop', 'available', ARRAY['Edge Glass Railing', 'City Skyline Panoramas'], 'round', 22, 25)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-302', 22, 2, 'skyline_rooftop', 'available', ARRAY['Golden Hour Horizon', 'Glass Railing'], 'round', 22, 65)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-303', 23, 4, 'skyline_rooftop', 'available', ARRAY['Firepit Adjacency', 'Lounge Seating'], 'rect', 50, 30)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-304', 24, 4, 'skyline_rooftop', 'available', ARRAY['Cocktail Bar Access', 'High Stools'], 'rect', 50, 70)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-305', 25, 6, 'skyline_rooftop', 'reserved', ARRAY['Skyline Cabana', 'Private Music Zone'], 'booth', 78, 50)
ON CONFLICT (id) DO NOTHING;

-- Sommelier VIP Cellar Tables
INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-401', 31, 2, 'vip_cellar', 'available', ARRAY['Intimate Vault Nook', 'Sommelier Service'], 'booth', 25, 30)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-402', 32, 4, 'vip_cellar', 'available', ARRAY['Leather Upholstery', 'Private Reserve Wall'], 'booth', 25, 70)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-403', 33, 6, 'vip_cellar', 'available', ARRAY['Curated Wine Racks', 'Acoustic Privacy'], 'booth', 60, 35)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.restaurant_tables (id, table_number, capacity, zone, status, features, shape, x, y)
VALUES ('T-404', 34, 8, 'vip_cellar', 'reserved', ARRAY['Presidential Boardroom', 'Private Sommelier'], 'rect', 65, 72)
ON CONFLICT (id) DO NOTHING;

-- Menu Items
INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-01', 'Charred Spanish Octopus', 'Slow-braised then flame-seared tender octopus tentacle, saffron potato mousseline, smoked paprika emulsion, micro cilantro.', 24.00, 'starters', ARRAY['gluten_free', 'chef_signature'], 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', 380, true, true, 4.9)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-02', 'Heirloom Burrata & Roasted Figs', 'Creamy Pugliese burrata, caramelized Mission figs, aged 25-year balsamic glaze, crushed Sicilian pistachios, toasted sourdough crisps.', 21.00, 'starters', ARRAY['vegetarian'], 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80', 420, true, false, 4.8)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-03', 'Wagyu Beef Carpaccio', 'Paper-thin Japanese A5 wagyu tenderloin, white truffle oil, shaved 36-month Parmigiano-Reggiano, caperberries, peppery baby arugula.', 26.00, 'starters', ARRAY['gluten_free', 'chef_signature'], 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', 340, true, true, 5.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-04', 'Dry-Aged Prime Tomahawk (42 oz)', '45-day dry-aged bone-in ribeye carved tableside, served with roasted bone marrow butter, black garlic jus, and charred seasonal alliums.', 135.00, 'chef_specials', ARRAY['gluten_free', 'chef_signature'], 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80', 1250, true, true, 5.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-05', 'Pan-Roasted Chilean Sea Bass', 'Glazed with sweet miso mirin, served over baby bok choy, lemongrass ginger dashi broth, and crispy lotus root chips.', 48.00, 'chef_specials', ARRAY['gluten_free', 'chef_signature'], 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80', 520, true, true, 4.9)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-08', 'Handmade Black Truffle Tagliolini', 'Egg pasta tossed in churned Normandy butter, 30-month aged Grana Padano, generously shaved fresh black winter truffles.', 38.00, 'artisan_pastas', ARRAY['vegetarian', 'chef_signature'], 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80', 610, true, true, 5.0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.menu_items (id, name, description, price, category, dietary_tags, image_url, calories, is_available, is_chef_special, rating)
VALUES ('m-14', 'Smoked Rosemary Old Fashioned', 'WhistlePig 10-Yr Rye, house spiced demerara syrup, Angostura bitters, served under a glass cloche filled with smoked applewood essence.', 22.00, 'handcrafted_cocktails', ARRAY['chef_signature'], 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', 210, true, true, 5.0)
ON CONFLICT (id) DO NOTHING;

-- Sample Reviews
INSERT INTO public.reviews (author_name, author_avatar, rating, visit_type, food_rating, ambiance_rating, service_rating, comment, verified)
VALUES ('Victoria Sterling', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 5, 'Anniversary Dinner', 5.0, 5.0, 5.0, 'The skyline terrace table at twilight was an unforgettable experience. The Chilean Sea Bass melted in our mouths, and the sommelier pairing was masterfully executed.', true);

INSERT INTO public.reviews (author_name, author_avatar, rating, visit_type, food_rating, ambiance_rating, service_rating, comment, verified)
VALUES ('Marcus Vance', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 5, 'Business Dining', 5.0, 5.0, 5.0, 'Hosted our quarterly executive dinner in the Sommelier VIP Cellar. Exceptional privacy, impeccable service, and the Dry-Aged Tomahawk was carved flawlessly tableside.', true);
