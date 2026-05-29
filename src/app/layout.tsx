import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "PayX — จ่ายง่าย ทุกที่",
  description: "PayX digital wallet & mini programs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ background: "#F5F0FF" }}>
        <StoreProvider>
          <div className="max-w-sm mx-auto relative overflow-hidden"
            style={{ minHeight: "100svh", background: "#F5F0FF", boxShadow: "0 0 60px rgba(124,58,237,0.08)" }}>
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
