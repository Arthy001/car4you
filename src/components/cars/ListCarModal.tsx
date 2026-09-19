"use client";

import React, { useState } from "react";
import { X, CheckCircle, Upload, Plus } from "lucide-react";
import { Car, CarCategory, FuelType } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface ListCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCarAdded: (newCar: Car) => void;
}

export function ListCarModal({ isOpen, onClose, onCarAdded }: ListCarModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Toyota");
  const [category, setCategory] = useState<CarCategory>("Sedan");
  const [fuelType, setFuelType] = useState<FuelType>("Petrol");
  const [pricePerDay, setPricePerDay] = useState(120);
  const [seats, setSeats] = useState(5);
  const [address, setAddress] = useState("Downtown Central");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newCar: Car = {
      id: "car-" + Date.now(),
      name: name || `${brand} Custom`,
      brand: brand,
      model_year: 2024,
      category: category,
      transmission: "Auto gearbox",
      seats: Number(seats),
      airbags: 6,
      fuel_type: fuelType,
      price_per_day: Number(pricePerDay),
      discount_percent: Number(discountPercent),
      rating: 5.0,
      review_count: 1,
      location_address: address,
      distance_airport: "1.5km from airport",
      image_url: imageUrl,
      mileage: "Unlimited mileage",
      is_favorite: false,
      features: ["Air Conditioning", "Bluetooth", "Smart Key"],
      description: "Newly listed vehicle in pristine condition. Available for immediate rental or test drive.",
    };

    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("cars").insert([newCar]);
      }
      onCarAdded(newCar);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      onCarAdded(newCar);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">List Your Vehicle</h3>
            <p className="text-xs text-slate-500">Add your car to the rental and marketplace catalog</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Vehicle Listed Successfully!</h4>
            <p className="text-xs text-slate-500">Your car is now visible in the catalog.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Car Model & Name</label>
              <input
                type="text"
                required
                placeholder="e.g. BMW 3 Series, Honda Civic"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CarCategory)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Electric">Electric</option>
                  <option value="Van">Van</option>
                  <option value="Compact">Compact</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as FuelType)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price per Day ($)</label>
                <input
                  type="number"
                  min="10"
                  required
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Discount (% OFF)</label>
                <input
                  type="number"
                  min="0"
                  max="70"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location Address</label>
              <input
                type="text"
                required
                placeholder="e.g. 124 Main Airport Boulevard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition shadow-md shadow-indigo-600/20"
              >
                {isSubmitting ? "Listing..." : "Submit Listing"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default ListCarModal;
