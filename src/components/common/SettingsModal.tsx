"use client";

import React, { useState } from "react";
import { X, Database, Palette, ShieldCheck, Check } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [themeColor, setThemeColor] = useState("indigo");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Application Settings</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-5 text-xs text-slate-600">
          {/* Database Status */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" /> Database Mode:
              </span>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                isSupabaseConfigured
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {isSupabaseConfigured ? "Supabase Live Connected" : "Local Mock Dataset Active"}
              </span>
            </div>
            <p className="mt-2 text-slate-500 text-[11px] leading-relaxed">
              {isSupabaseConfigured 
                ? "Connected to your live Supabase cloud database instance."
                : "Using high-speed mock data. To connect your Supabase database, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"}
            </p>
          </div>

          {/* Rules status */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <span className="font-bold text-indigo-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> Project Rules (GEMINI.md):
            </span>
            <p className="mt-1 text-indigo-900/80 text-[11px]">
              ห้ามแก้ไขโค้ดเองโดยพลการ (Strict developer & AI modification rules active).
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SettingsModal;
