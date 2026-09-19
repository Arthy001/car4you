-- Supabase Schema for Car Rental & Marketplace Application
-- Run this SQL in your Supabase SQL Editor

-- 1. Create cars table
CREATE TABLE IF NOT EXISTS public.cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    model_year INTEGER NOT NULL DEFAULT 2024,
    category VARCHAR(50) NOT NULL DEFAULT 'Sedan',
    transmission VARCHAR(50) NOT NULL DEFAULT 'Auto gearbox',
    seats INTEGER NOT NULL DEFAULT 5,
    airbags INTEGER NOT NULL DEFAULT 6,
    fuel_type VARCHAR(50) NOT NULL DEFAULT 'Petrol',
    price_per_day NUMERIC(10, 2) NOT NULL,
    discount_percent INTEGER DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    review_count INTEGER DEFAULT 0,
    location_address VARCHAR(255) NOT NULL,
    distance_airport VARCHAR(100) DEFAULT '2km from airport',
    image_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT '{}',
    mileage VARCHAR(100) DEFAULT 'Unlimited',
    description TEXT,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    car_name VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    dropoff_location VARCHAR(255) NOT NULL,
    pickup_date DATE NOT NULL,
    dropoff_date DATE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    days INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    user_id UUID,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(car_id, session_id)
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Allow anyone to read car listings
CREATE POLICY "Allow public read access on cars" 
ON public.cars FOR SELECT USING (true);

-- Allow public to create bookings
CREATE POLICY "Allow public insert on bookings" 
ON public.bookings FOR INSERT WITH CHECK (true);

-- Allow reading own bookings by email or session
CREATE POLICY "Allow read on bookings" 
ON public.bookings FOR SELECT USING (true);

-- Allow public read and write on favorites for visitor sessions
CREATE POLICY "Allow public read favorites" 
ON public.favorites FOR SELECT USING (true);

CREATE POLICY "Allow public insert favorites" 
ON public.favorites FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete favorites" 
ON public.favorites FOR DELETE USING (true);

-- 6. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cars_category ON public.cars(category);
CREATE INDEX IF NOT EXISTS idx_cars_fuel_type ON public.cars(fuel_type);
CREATE INDEX IF NOT EXISTS idx_cars_price ON public.cars(price_per_day);
CREATE INDEX IF NOT EXISTS idx_cars_rating ON public.cars(rating);
