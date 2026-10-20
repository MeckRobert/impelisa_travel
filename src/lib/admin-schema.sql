-- Admin schema additions — run once against your PostgreSQL database

-- 1. Add status and amount columns to bookings if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='status') THEN
    ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='amount') THEN
    ALTER TABLE bookings ADD COLUMN amount NUMERIC(10,2) DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='notes') THEN
    ALTER TABLE bookings ADD COLUMN notes TEXT;
  END IF;
END $$;

-- 2. Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  country     TEXT NOT NULL DEFAULT 'Tanzania',
  description TEXT,
  image_url   TEXT,
  status      TEXT DEFAULT 'active',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed destinations if empty
INSERT INTO destinations (name, country, description, image_url, status)
SELECT * FROM (VALUES
  ('Serengeti National Park', 'Tanzania', 'Famous for the Great Migration', '/images/serengeti.jpg', 'active'),
  ('Ngorongoro Crater',       'Tanzania', 'UNESCO World Heritage Site',     '/images/ngorongoro.jpg', 'active'),
  ('Zanzibar',                'Tanzania', 'Pristine beaches and culture',   '/images/zanzibar.jpg', 'active'),
  ('Mount Kilimanjaro',       'Tanzania', 'Africa''s highest peak',         '/images/kilimanjaro.jpg', 'active'),
  ('Mikumi National Park',    'Tanzania', 'Tanzania''s most accessible park','/images/mikumi.jpg', 'active'),
  ('Lake Manyara',            'Tanzania', 'Flamingo paradise',              '/images/manyara.jpg', 'active'),
  ('Ruaha National Park',     'Tanzania', 'Tanzania''s largest national park','/images/ruaha.jpg', 'active'),
  ('Tarangire National Park', 'Tanzania', 'Famous for elephant herds',      '/images/tarangire.jpg', 'active')
) AS v(name, country, description, image_url, status)
WHERE NOT EXISTS (SELECT 1 FROM destinations LIMIT 1);

-- 3. Safari packages table
CREATE TABLE IF NOT EXISTS safari_packages (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  duration_days    INT  NOT NULL,
  price_per_person NUMERIC(10,2) NOT NULL,
  description      TEXT,
  image_url        TEXT,
  status           TEXT DEFAULT 'active',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Seed packages if empty
INSERT INTO safari_packages (name, duration_days, price_per_person, description, image_url, status)
SELECT * FROM (VALUES
  ('Serengeti Safari',    6, 1200.00, 'Classic Serengeti experience',           '/images/serengeti.jpg', 'active'),
  ('Kilimanjaro Trek',    7, 1600.00, 'Summit Africa''s highest peak',           '/images/kilimanjaro.jpg', 'active'),
  ('Zanzibar Beach',      4, 1000.00, 'Relax on pristine white-sand beaches',   '/images/zanzibar.jpg', 'active'),
  ('Ngorongoro Crater',   4,  980.00, 'Explore the eighth wonder of the world', '/images/ngorongoro.jpg', 'active'),
  ('Tarangire Safari',    3,  880.00, 'Witness massive elephant herds',         '/images/tarangire.jpg', 'active'),
  ('Lake Manyara Safari', 3,  760.00, 'Flamingos and tree-climbing lions',      '/images/manyara.jpg', 'active')
) AS v(name, duration_days, price_per_person, description, image_url, status)
WHERE NOT EXISTS (SELECT 1 FROM safari_packages LIMIT 1);
