import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "PayX — สั่งอาหาร จ่ายง่าย",
  description: "สแกน QR สั่งอาหาร จ่ายเงินผ่านแอพ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gray-100 min-h-screen">
        <StoreProvider>
          <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden shadow-2xl">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
