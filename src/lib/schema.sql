-- Run this once against your PostgreSQL database to create the bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id              SERIAL PRIMARY KEY,
  full_name       TEXT,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  destination     TEXT NOT NULL,
  start_date      DATE,
  end_date        DATE,
  num_travellers  TEXT,
  budget          TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
