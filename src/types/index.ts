export type CarCategory = 
  | "All"
  | "Sedan" 
  | "SUV" 
  | "Hatchback" 
  | "Electric" 
  | "Van" 
  | "Coupe" 
  | "Compact";

export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";

export type TransmissionType = "Auto gearbox" | "Manual gearbox";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model_year: number;
  category: CarCategory;
  transmission: TransmissionType;
  seats: number;
  airbags: number;
  fuel_type: FuelType;
  price_per_day: number;
  discount_percent?: number;
  rating: number;
  review_count: number;
  location_address: string;
  distance_airport: string;
  image_url: string;
  gallery_urls?: string[];
  is_favorite?: boolean;
  features?: string[];
  description?: string;
  lat?: number;
  lng?: number;
  mileage?: string;
  created_at?: string;
}

export interface FilterState {
  searchTerm: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  isDifferentDropoff: boolean;
  carTypes: string[];
  fuelTypes: string[];
  minPrice: number;
  maxPrice: number;
  transmission: string[];
  seats: number[];
  sortBy: "recommended" | "price_asc" | "price_desc" | "rating";
}

export interface BookingSubmission {
  car_id: string;
  car_name: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  dropoff_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  days: number;
  notes?: string;
}

export interface BookingRecord extends BookingSubmission {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}
