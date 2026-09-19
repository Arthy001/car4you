-- Supabase Schema for Car4U Used Car Marketplace
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
    price NUMERIC(12, 2) NOT NULL,
    price_per_day NUMERIC(10, 2),
    monthly_payment NUMERIC(10, 2),
    discount_percent INTEGER DEFAULT 0,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    review_count INTEGER DEFAULT 0,
    location_address VARCHAR(255) NOT NULL,
    distance_airport VARCHAR(100) DEFAULT '2km from airport branch',
    image_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT '{}',
    mileage VARCHAR(100) DEFAULT '30,000 km',
    warranty VARCHAR(100) DEFAULT '1 Year Car4U Warranty',
    condition VARCHAR(100) DEFAULT 'Certified Pre-Owned',
    description TEXT,
    lat NUMERIC(10, 6),
    lng NUMERIC(10, 6),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create bookings/inquiries table
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
    total_price NUMERIC(12, 2) NOT NULL,
    days INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID REFERENCES public.cars(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Allow public read access on cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Allow public insert on cars" ON public.cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on cars" ON public.cars FOR UPDATE USING (true);
CREATE POLICY "Allow public insert on bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read on bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public all favorites" ON public.favorites FOR ALL USING (true);
