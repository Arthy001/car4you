export type CarCategory = 
  | "All"
  | "Sedan" 
  | "SUV" 
  | "Hatchback" 
  | "EV" 
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
  price: number; // Total used car selling price (e.g. $14,800)
  price_per_day?: number; // Optional alias
  monthly_payment?: number; // Estimated monthly finance installment (e.g. $240/mo)
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
  warranty?: string;
  condition?: string;
  created_at?: string;
}

export interface FilterState {
  searchTerm: string;
  location: string;
  carTypes: string[];
  fuelTypes: string[];
  minPrice: number;
  maxPrice: number;
  transmission: string[];
  seats: number[];
  condition: string;
  sortBy: "recommended" | "price_asc" | "price_desc" | "rating" | "year_desc";
}

export interface TestDriveInquiry {
  car_id: string;
  car_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  preferred_date: string;
  payment_method: "cash" | "finance";
  down_payment?: number;
  notes?: string;
}

export interface InquiryRecord extends TestDriveInquiry {
  id: string;
  status: "pending" | "contacted" | "completed";
  created_at: string;
}
