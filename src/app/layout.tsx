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
      <body style={{ background: "#0D0520" }}>
        <StoreProvider>
          <div className="max-w-sm mx-auto relative overflow-hidden shadow-2xl"
            style={{ minHeight: "100svh", background: "#0D0520" }}>
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
