import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car4U - ตลาดซื้อขายรถมือสองคุณภาพดี คัดเกรดพรีเมียม | Certified Used Cars",
  description: "ค้นหาและซื้อขายรถมือสองคุณภาพ ตรวจเช็กสภาพ 200+ จุด การันตีไมล์แท้ ไม่เคยชนหนัก พร้อมบริการจัดไฟแนนซ์และทดลองขับ",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#FDFDFE] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
