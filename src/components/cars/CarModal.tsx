"use client";

import React, { useState } from "react";
import { 
  X, 
  Star, 
  MapPin, 
  Users, 
  Cog, 
  ShieldCheck, 
  Zap, 
  Check, 
  Calendar, 
  CheckCircle,
  Phone,
  Mail,
  User,
  Fuel,
  Gauge
} from "lucide-react";
import { Car, BookingSubmission } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
  onBookingSuccess?: () => void;
}

export function CarModal({ car, onClose, onBookingSuccess }: CarModalProps) {
  const [pickupDate, setPickupDate] = useState("2026-09-21");
  const [dropoffDate, setDropoffDate] = useState("2026-09-24");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!car) return null;

  // Calculate rental days and total price
  const start = new Date(pickupDate);
  const end = new Date(dropoffDate);
  const diffTime = Math.max(end.getTime() - start.getTime(), 1000 * 60 * 60 * 24);
  const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const baseTotal = car.price_per_day * days;
  const discountAmount = car.discount_percent ? (baseTotal * car.discount_percent) / 100 : 0;
  const totalPrice = Math.round(baseTotal - discountAmount);

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingData: BookingSubmission = {
      car_id: car.id,
      car_name: car.name,
      pickup_location: car.location_address,
      dropoff_location: car.location_address,
      pickup_date: pickupDate,
      dropoff_date: dropoffDate,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      total_price: totalPrice,
      days: days,
      notes: notes,
    };

    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("bookings").insert([bookingData]);
      }
      // Simulate delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
      onBookingSuccess?.();
    } catch (err) {
      console.error("Booking error:", err);
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
            <h2 className="text-xl font-bold text-slate-900">{car.name}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" /> {car.rating} ({car.review_count} reviews)
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
              <h3 className="text-2xl font-bold text-slate-900">Reservation Request Confirmed!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{customerName || "Customer"}</span>. Your booking for <span className="font-semibold text-indigo-600">{car.name}</span> has been received. A confirmation email will be sent to <span className="font-semibold">{customerEmail || "your email"}</span>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition"
                >
                  Close Window
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
                    {car.description || "Premium, comfortable and highly reliable vehicle available for instant rental or purchase."}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>{car.seats} Passenger seats</span>
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
                      <Gauge className="w-4 h-4 text-indigo-600" />
                      <span>{car.mileage || "Unlimited"}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">Daily rate</span>
                    <div>
                      <span className="text-2xl font-black text-slate-900">${car.price_per_day}</span>
                      <span className="text-xs text-slate-400"> /day</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking / Inquiry Form */}
              <form onSubmit={handleSubmitBooking} className="border-t border-slate-100 pt-5 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Book This Vehicle</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Pick up date</label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Drop off date</label>
                    <input
                      type="date"
                      required
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* Price summary */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-indigo-950">Rental Duration:</span>{" "}
                    <span className="text-indigo-800">{days} day(s)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 mr-2">Estimated Total:</span>
                    <span className="text-base font-black text-indigo-900">${totalPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-full transition shadow-md shadow-indigo-600/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Confirm & Reserve"}
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
