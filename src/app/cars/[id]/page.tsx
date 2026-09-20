"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  Users, 
  Cog, 
  ShieldCheck, 
  Luggage, 
  Check, 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle,
  FileText,
  Phone,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Camera
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { initialCarsData } from "@/lib/data/mockCars";
import { Car } from "@/types";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Language } from "@/lib/i18n/translations";
import { formatPriceByLang, formatMonthlyByLang } from "@/lib/utils";

export default function CarDetailPage() {
  const params = useParams();
  const carId = params?.id as string;
  const [lang, setLang] = useState<Language>("th");
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("Sep 22 - Sep 24");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch Car by ID from Supabase or Fallback to Mock
  useEffect(() => {
    async function loadCar() {
      setLoading(true);
      if (isSupabaseConfigured) {
        try {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const { data } = await supabase.from("cars").select("*").eq("id", carId).single();
            if (data) {
              const normalized = {
                ...(data as Car),
                category: (data.category === "Electric" || data.fuel_type === "Electric") ? ("EV" as const) : (data.category as any)
              };
              setCar(normalized);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn("Could not load car from Supabase, trying fallback:", err);
        }
      }

      // Fallback to local dataset
      const found = initialCarsData.find((c) => c.id === carId) || initialCarsData[0];
      setCar(found);
      setLoading(false);
    }

    if (carId) {
      loadCar();
    }
  }, [carId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;
    setIsSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("bookings").insert([{
          car_id: car.id,
          car_name: car.name,
          customer_name: buyerName || "Customer",
          customer_phone: buyerPhone || "080-000-0000",
          customer_email: "inquiry@car4u.com",
          pickup_date: "2026-09-22",
          dropoff_date: "2026-09-24",
          pickup_location: car.location_address,
          dropoff_location: car.location_address,
          total_price: car.price || 18600,
          days: 1,
          notes: `[Car Detail Page Test Drive Request] Appointment: ${appointmentDate}`,
        }]);
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !car) {
    return (
      <div className="min-h-screen bg-[#FDFDFE] flex flex-col">
        <Navbar lang={lang} onLanguageChange={setLang} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
        <Footer lang={lang} />
      </div>
    );
  }

  const basePrice = car.price || car.price_per_day || 18600;
  const formattedPrice = formatPriceByLang(basePrice, lang);
  const formattedMonthly = formatMonthlyByLang(basePrice, car.monthly_payment, lang);

  // Gallery Photos matching template collage (Front, Cockpit, Side, Profile)
  const gallery = [
    car.image_url,
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFE] flex flex-col">
      <Navbar lang={lang} onLanguageChange={setLang} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-5">
          <Link href="/" className="hover:text-slate-700 transition">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#listings" className="hover:text-slate-700 transition">รถมือสองทั้งหมด</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">{car.name}</span>
        </div>

        {/* 1. Photo Gallery Grid matching Mockup Image 1 */}
        <div className="relative rounded-[28px] overflow-hidden mb-8 group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[380px] sm:h-[440px]">
            {/* Main Featured Photo (Left Column - 5 cols) */}
            <div className="md:col-span-5 h-full rounded-2xl overflow-hidden relative">
              <img
                src={gallery[0]}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Middle Column (2 stacked photos - 3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-3 h-full">
              <div className="flex-1 rounded-2xl overflow-hidden relative">
                <img
                  src={gallery[1]}
                  alt="Interior cockpit"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden relative">
                <img
                  src={gallery[2]}
                  alt="Front headlight"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column (1 Tall Wide photo - 4 cols) */}
            <div className="md:col-span-4 h-full rounded-2xl overflow-hidden relative">
              <img
                src={gallery[3]}
                alt="Side profile"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>

          {/* "Show all photos" Button in bottom-left */}
          <button
            type="button"
            className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-white transition flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-slate-700" />
            <span>Show all photos</span>
          </button>
        </div>

        {/* 2. Main Detail Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Title, Specs, Included Benefits, Buyer Checklist */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Car Title Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-3">
                    {car.brand} Group
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {car.name}
                  </h1>

                  {/* Rating & Address */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {car.rating} ({car.review_count})
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {car.location_address}
                    </span>
                  </div>
                </div>

                {/* Favorite & Share Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
                    aria-label="Save"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition"
                    aria-label="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Host / Specialist Tag */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Agent avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>
                <div className="text-xs text-slate-500">
                  <span>ผู้ดูแลรถคันนี้: </span>
                  <span className="font-bold text-slate-900">Car4U Specialist Certified</span>
                </div>
              </div>

              {/* Specs Badges Row matching template */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{car.seats} seats</span>
                </div>

                <div className="flex items-center gap-2">
                  <Cog className="w-4 h-4 text-slate-400" />
                  <span>{car.transmission}</span>
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>{car.airbags} airbags</span>
                </div>

                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-slate-400" />
                  <span>3 Large bags</span>
                </div>
              </div>
            </div>

            {/* 3. "Included in this purchase" (สิทธิประโยชน์ที่รวมในราคานี้) */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Included in this purchase (สิทธิประโยชน์ที่รวมในราคานี้)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>รับประกันเครื่องยนต์และระบบเกียร์ 1 ปีเต็ม</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>การันตีไมล์แท้ ไม่เคยชนหนัก พลิกคว่ำ หรือจมน้ำ</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>ตรวจเช็กสภาพมาตรฐานศูนย์ 200+ จุดอย่างละเอียด</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>ฟรีบริการช่วยเหลือฉุกเฉินบนท้องถนน 24 ชั่วโมง (24/7)</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>อบโอโซน ล้างห้องเครื่อง และสปาเบาะทั้งคันก่อนส่งมอบ</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>ฟรีค่าจัดไฟแนนซ์ และบริการทำสัญญาถึงที่บ้าน</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>รับประกันคืนเงินภายใน 7 วันหากตรวจพบข้อมูลไม่ตรงจริง</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>เล่มทะเบียนตัวจริงพร้อมโอนกรรมสิทธิ์ถูกต้อง 100%</span>
                </div>
              </div>
            </div>

            {/* 4. "Buyer's checklist & Financing" (เอกสารและขั้นตอนการออกรถ) */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Buyer&apos;s checklist (เอกสารและขั้นตอนการออกรถ)
              </h2>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
                  <div className="sm:col-span-4 font-semibold text-slate-800">เวลาทำการนัดหมายดูรถ</div>
                  <div className="sm:col-span-8 text-slate-600">เปิดให้บริการทุกวัน จันทร์ - อาทิตย์ เวลา 09:00 - 18:00 น.</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
                  <div className="sm:col-span-4 font-semibold text-slate-800">เอกสารผู้ซื้อ / ผู้กู้ร่วม</div>
                  <div className="sm:col-span-8 text-slate-600">สำเนาบัตรประชาชน, สำเนาทะเบียนบ้าน, สลิปเงินเดือนย้อนหลัง และ สเตทเม้นต์ 6 เดือน</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
                  <div className="sm:col-span-4 font-semibold text-slate-800">เงื่อนไขการทดลองขับ</div>
                  <div className="sm:col-span-8 text-slate-600">มีใบขับขี่รถยนต์ส่วนบุคคลที่ยังไม่หมดอายุ พร้อมทดลองขับบนเส้นทางจริงได้ทันที</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-3 border-b border-slate-100">
                  <div className="sm:col-span-4 font-semibold text-slate-800">การจองและชำระเงิน</div>
                  <div className="sm:col-span-8 text-slate-600">จองเพื่อล็อครถเพียง 5,000 บาท (ยินดีคืนเงินจองเต็มจำนวนหากไฟแนนซ์ไม่ผ่าน)</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4 font-semibold text-slate-800">บริการส่งมอบรถ</div>
                  <div className="sm:col-span-8 text-slate-600">มีบริการรถสไลด์ส่งมอบรถยนต์ถึงหน้าบ้านคุณทั่วประเทศ</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Inspection Branch Card + Pricing & Test Drive Card */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Top Box: Inspection Center & Branch Location matching template */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                สถานที่ดูรถและทดลองขับ (Inspection center)
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-400 bg-white" />
                  <div className="text-[11px] text-slate-400 font-medium">สาขาจัดแสดงรถ</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{car.location_address}</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-400 bg-white" />
                  <div className="text-[11px] text-slate-400 font-medium">เวลาทำการนัดหมาย</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">เปิดทุกวัน 09:00 - 18:00 น.</div>
                </div>
              </div>
            </div>

            {/* Bottom Box: Price, Loan Installment & Test Drive Form */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-xl shadow-slate-200/50">
              
              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between mb-5">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    {formattedPrice}
                  </div>
                  <div className="text-xs font-bold text-indigo-600 mt-0.5">
                    {lang === "th" ? `ผ่อนเริ่มต้น ${formattedMonthly}` : `Starts from ${formattedMonthly}`}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{car.rating}</span>
                  <span className="text-slate-400 font-normal">({car.review_count})</span>
                </div>
              </div>

              {isSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-base font-bold text-slate-900">บันทึกนัดหมายสำเร็จ!</h4>
                  <p className="text-xs text-slate-500">
                    เจ้าหน้าที่สาขาจะติดต่อกลับไปยังเบอร์โทรของคุณเพื่อนัดหมายวันและเวลาทดลองขับครับ
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {/* Appointment Date Field matching mockup date box */}
                  <div className="border border-slate-200 rounded-2xl p-3.5 hover:border-slate-300 transition">
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>วันนัดหมายดูรถ & ทดลองขับ</span>
                    </div>
                    <input
                      type="text"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      placeholder="Sep 22 - Sep 24"
                      className="w-full text-sm font-bold text-slate-900 border-none p-0 focus:outline-none bg-transparent"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="ชื่อ - นามสกุลของคุณ"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="เบอร์โทรศัพท์ติดต่อ"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  {/* Pricing Breakdown Rows matching template */}
                  <div className="pt-2 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>{lang === "th" ? "ราคาขายเงินสด" : "Vehicle Cash Price"}</span>
                      <span className="font-bold text-slate-800">{formattedPrice}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{lang === "th" ? "ค่าตรวจสภาพ 200 จุด" : "200-Point Inspection"}</span>
                      <span className="text-emerald-600 font-bold">{lang === "th" ? "ฟรี" : "Free"}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{lang === "th" ? "ค่าโอนกรรมสิทธิ์ & ไฟแนนซ์" : "Transfer & Document Fee"}</span>
                      <span className="text-emerald-600 font-bold">{lang === "th" ? "ฟรี" : "Free"}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between font-extrabold text-sm text-slate-900">
                      <span>{lang === "th" ? "ราคารวมทั้งสิ้น" : "Total Purchase Price"}</span>
                      <span className="text-indigo-600 font-black">{formattedPrice}</span>
                    </div>
                  </div>

                  {/* Reserve / Book Test Drive Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition duration-200 shadow-md active:scale-98 disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? "กำลังส่งคำขอ..." : "นัดหมายดูรถ & ทดลองขับ (Reserve)"}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
