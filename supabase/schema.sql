CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS site_settings (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), site_name TEXT NOT NULL DEFAULT 'Voices of Vehari', contact_email TEXT, contact_phone TEXT, address TEXT, facebook_url TEXT, twitter_url TEXT, instagram_url TEXT, footer_text TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS dynamic_sections (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), section_id TEXT UNIQUE NOT NULL, title TEXT, subheading TEXT, content TEXT, image_url TEXT, button_text TEXT, button_link TEXT, is_visible BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS news_events (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, type TEXT NOT NULL DEFAULT 'news', description TEXT, content TEXT, image_url TEXT, event_date TIMESTAMPTZ, event_location TEXT, is_published BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS podcasts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, guest_name TEXT, description TEXT, audio_url TEXT, transcript_url TEXT, tags TEXT[], is_published BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS gallery (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT, caption TEXT, image_url TEXT NOT NULL, category TEXT, is_published BOOLEAN DEFAULT false, sort_order INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS team (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, role TEXT, bio TEXT, image_url TEXT, type TEXT DEFAULT 'leadership', sort_order INTEGER DEFAULT 0, created_at TIMESTAMPTZ DEFAULT NOW());

CREATE TABLE IF NOT EXISTS contact_messages (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT, message TEXT NOT NULL, is_read BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW());

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE dynamic_sections ENABLE ROW LEVEL SECURITY;

ALTER TABLE news_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

ALTER TABLE team ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT USING (true);

CREATE POLICY "public_read_dynamic_sections" ON dynamic_sections FOR SELECT USING (is_visible = true);

CREATE POLICY "public_read_news_events" ON news_events FOR SELECT USING (is_published = true);

CREATE POLICY "public_read_podcasts" ON podcasts FOR SELECT USING (is_published = true);

CREATE POLICY "public_read_gallery" ON gallery FOR SELECT USING (is_published = true);

CREATE POLICY "public_read_team" ON team FOR SELECT USING (true);

CREATE POLICY "public_insert_messages" ON contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "admin_all_site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_dynamic_sections" ON dynamic_sections FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_news_events" ON news_events FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_podcasts" ON podcasts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_team" ON team FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO site_settings (site_name) VALUES ('Voices of Vehari') ON CONFLICT DO NOTHING;
