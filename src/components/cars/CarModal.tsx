"use client";

import React, { useState } from "react";
import { 
  X, 
  Star, 
  MapPin, 
  Users, 
  Cog, 
  ShieldCheck, 
  CheckCircle,
  Fuel,
  Gauge,
  Sparkles,
  Calendar,
  CreditCard,
  Banknote
} from "lucide-react";
import { Car, TestDriveInquiry } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
  onBookingSuccess?: () => void;
}

export function CarModal({ car, onClose, onBookingSuccess }: CarModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-09-22");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "finance">("finance");
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!car) return null;

  const displayPrice = car.price || (car.price_per_day ? car.price_per_day * 100 : 15000);
  const downPaymentAmount = Math.round((displayPrice * downPaymentPercent) / 100);
  const loanAmount = displayPrice - downPaymentAmount;
  const estimatedMonthly = Math.round(loanAmount / 60);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiryData: TestDriveInquiry = {
      car_id: car.id,
      car_name: car.name,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      preferred_date: preferredDate,
      payment_method: paymentMethod,
      down_payment: downPaymentAmount,
      notes: notes,
    };

    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("bookings").insert([{
          car_id: car.id,
          car_name: car.name,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          pickup_date: preferredDate,
          dropoff_date: preferredDate,
          pickup_location: car.location_address,
          dropoff_location: car.location_address,
          total_price: displayPrice,
          days: 1,
          notes: `[Used Car Inquiry - ${paymentMethod.toUpperCase()}] Down: $${downPaymentAmount}, Monthly: ~$${estimatedMonthly}. ${notes}`,
        }]);
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
      onBookingSuccess?.();
    } catch (err) {
      console.error("Inquiry error:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{car.name} ({car.model_year})</h2>
              {car.condition && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {car.condition}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" /> {car.rating} ({car.review_count} รีวิว)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> {car.location_address}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in-50">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">ส่งคำขอนัดหมายดูรถสำเร็จ!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                ขอบคุณครับ คุณ <span className="font-semibold text-slate-900">{customerName || "ลูกค้า"}</span> ทางเจ้าหน้าที่ Car4U สาขา <span className="font-semibold text-indigo-600">{car.location_address}</span> จะติดต่อกลับเพื่อนัดหมายเวลาทดลองขับ <span className="font-semibold">{car.name}</span> โดยเร็วที่สุดครับ
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Photo & Key Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 h-56 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 relative">
                  {car.discount_percent && car.discount_percent > 0 ? (
                    <span className="absolute top-3 left-3 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      -{car.discount_percent}% OFF
                    </span>
                  ) : null}
                  <img
                    src={car.image_url}
                    alt={car.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />
                </div>

                <div className="md:col-span-6 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {car.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-indigo-600" />
                      <span>{car.mileage || "ไมล์แท้"}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <Cog className="w-4 h-4 text-indigo-600" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-indigo-600" />
                      <span>{car.fuel_type}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{car.warranty || "รับประกัน 1 ปี"}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">ราคาขายเงินสด</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900">${displayPrice.toLocaleString()}</span>
                      <div className="text-xs text-indigo-600 font-bold">ประมาณการผ่อน ~${estimatedMonthly} /เดือน</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry & Test Drive Form */}
              <form onSubmit={handleSubmitInquiry} className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">ติดต่อขอดูรถ / นัดหมายทดลองขับ</h4>
                  
                  {/* Payment method toggle */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("finance")}
                      className={`px-3 py-1 rounded-full transition flex items-center gap-1 ${
                        paymentMethod === "finance"
                          ? "bg-white text-indigo-600 shadow-xs"
                          : "text-slate-600"
                      }`}
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>จัดไฟแนนซ์ / ผ่อน</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`px-3 py-1 rounded-full transition flex items-center gap-1 ${
                        paymentMethod === "cash"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600"
                      }`}
                    >
                      <Banknote className="w-3 h-3" />
                      <span>ซื้อเงินสด</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อ - นามสกุล</label>
                    <input
                      type="text"
                      required
                      placeholder="สมชาย ใจดี"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                    <input
                      type="tel"
                      required
                      placeholder="081-234-5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">วันที่สะดวกนัดหมาย</label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Finance calculator widget if financing */}
                {paymentMethod === "finance" && (
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-2">
                    <div className="flex items-center justify-between font-semibold text-indigo-950">
                      <span>เงินดาวน์ ({downPaymentPercent}%): <b className="text-indigo-800">${downPaymentAmount.toLocaleString()}</b></span>
                      <span>ค่างวดผ่อน 60 งวด: <b className="text-indigo-600 text-sm">~${estimatedMonthly} /เดือน</b></span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-indigo-900/60 font-medium">
                      <span>ฟรีดาวน์ 0%</span>
                      <span>ดาวน์ 25%</span>
                      <span>ดาวน์ 50%</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-full transition shadow-md shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งคำขอนัดหมาย & ปรึกษาไฟแนนซ์"}
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default CarModal;
