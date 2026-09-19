import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
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
    <html 
      lang="th" 
      className={`${plusJakartaSans.variable} ${notoSansThai.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FDFDFE] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
