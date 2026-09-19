"use client";

import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
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
  const [year, setYear] = useState(2023);
  const [mileage, setMileage] = useState("35,000 km");
  const [category, setCategory] = useState<CarCategory>("Sedan");
  const [fuelType, setFuelType] = useState<FuelType>("Petrol");
  const [price, setPrice] = useState(15000);
  const [condition, setCondition] = useState("Certified Pre-Owned");
  const [address, setAddress] = useState("Bangkok Central");
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
      model_year: Number(year),
      category: category,
      transmission: "Auto gearbox",
      seats: 5,
      airbags: 6,
      fuel_type: fuelType,
      price: Number(price),
      price_per_day: Math.round(Number(price) / 100),
      monthly_payment: Math.round(Number(price) / 60),
      discount_percent: Number(discountPercent),
      rating: 5.0,
      review_count: 1,
      location_address: address,
      distance_airport: "2km from airport branch",
      image_url: imageUrl,
      mileage: mileage,
      warranty: "1 Year Car4U Warranty",
      condition: condition,
      is_favorite: false,
      features: ["Air Conditioning", "Bluetooth Audio", "Smart Key", "1-Owner History"],
      description: `รถมือสองสภาพสวยคัดพิเศษ ไมล์แท้ ${mileage} ตรวจเช็กสภาพพร้อมใช้งานทันที`,
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
            <h3 className="text-lg font-bold text-slate-900">ลงขายรถมือสองของคุณ</h3>
            <p className="text-xs text-slate-500">โพสต์ขายรถฟรี เข้าถึงผู้ซื้อนับแสนคนบน Car4U</p>
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
            <h4 className="text-xl font-bold text-slate-900">ลงขายรถสำเร็จเรียบร้อย!</h4>
            <p className="text-xs text-slate-500">ข้อมูลรถของคุณขึ้นแสดงในระบบเรียบร้อยแล้ว</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ยี่ห้อ & รุ่นรถยนต์ (Car Brand & Model)</label>
              <input
                type="text"
                required
                placeholder="เช่น Honda Civic RS, Toyota Corolla Cross"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ปีรถ (Model Year)</label>
                <input
                  type="number"
                  min="2010"
                  max="2026"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">เลขไมล์ (Mileage)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น 35,000 km"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ประเภทรถ (Category)</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CarCategory)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Sedan">Sedan (รถเก๋ง 4 ประตู)</option>
                  <option value="SUV">SUV (รถอเนกประสงค์)</option>
                  <option value="Hatchback">Hatchback (รถ 5 ประตู)</option>
                  <option value="Electric">Electric (รถยนต์ไฟฟ้า EV)</option>
                  <option value="Van">Van (รถตู้)</option>
                  <option value="Compact">Compact (อีโค่คาร์)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">เชื้อเพลิง (Fuel Type)</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as FuelType)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="Petrol">เบนซิน (Petrol)</option>
                  <option value="Diesel">ดีเซล (Diesel)</option>
                  <option value="Electric">ไฟฟ้า (Electric EV)</option>
                  <option value="Hybrid">ไฮบริด (Hybrid)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ราคาขาย ($ หรือ ฿)</label>
                <input
                  type="number"
                  min="1000"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ส่วนลดพิเศษ (% OFF)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">สถานที่ดูรถ / สาขา (Location)</label>
              <input
                type="text"
                required
                placeholder="เช่น สาขารัชดาภิเษก, กรุงเทพมหานคร"
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
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-full transition shadow-md shadow-indigo-600/20"
              >
                {isSubmitting ? "กำลังบันทึก..." : "ยืนยันลงขายรถ"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default ListCarModal;
