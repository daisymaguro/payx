"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ScanPage() {
  const router = useRouter();
  const { dispatch } = useStore();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanned(true);
      dispatch({ type: "SCAN_QR", tableNumber: "12" });
      setTimeout(() => router.push("/menu"), 1200);
    }, 2200);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#0D0520" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={() => router.back()}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.08)" }}>
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: "#7C3AED" }}>P</div>
          <span className="text-white font-black text-base tracking-tight">
            Pay<span style={{ color: "#A855F7" }}>X</span> Scan
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ background: "rgba(168,85,247,0.12)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#A855F7" }} />
          <span className="text-xs font-medium" style={{ color: "#A855F7" }}>พร้อม</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <div className="text-center">
          <p className="text-white/40 text-sm leading-relaxed">
            สแกน QR Code ที่โต๊ะหรือเคาน์เตอร์<br />
            <span style={{ color: "#C084FC" }}>เพื่อเปิด Mini Program ของร้านค้า</span>
          </p>
        </div>

        {/* QR viewfinder */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent)", filter: "blur(20px)" }} />

          {/* Corner brackets */}
          {[
            "top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-2xl",
            "top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-2xl",
            "bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl",
            "bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-12 h-12 ${cls}`}
              style={{ borderColor: i < 2 ? "#A855F7" : "#6D28D9" }} />
          ))}

          <div className="absolute inset-3 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "rgba(26,13,53,0.9)" }}>

            {!scanning && !scanned && (
              <div className="text-center">
                <svg width="52" height="52" viewBox="0 0 52 52" className="mx-auto mb-3 opacity-20" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="2"/>
                  <rect x="8" y="8" width="8" height="8" rx="1" fill="white" opacity="0.5"/>
                  <rect x="32" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="2"/>
                  <rect x="36" y="8" width="8" height="8" rx="1" fill="white" opacity="0.5"/>
                  <rect x="4" y="32" width="16" height="16" rx="3" stroke="white" strokeWidth="2"/>
                  <rect x="8" y="36" width="8" height="8" rx="1" fill="white" opacity="0.5"/>
                  <rect x="32" y="32" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
                  <rect x="40" y="32" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
                  <rect x="32" y="40" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
                  <rect x="40" y="40" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
                </svg>
                <p className="text-white/25 text-xs">กดปุ่มด้านล่างเพื่อสแกน</p>
              </div>
            )}

            {scanning && !scanned && (
              <div className="w-36 h-36 relative">
                <div className="absolute inset-0 grid grid-cols-7 gap-0.5 p-1 opacity-60">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const filled = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,11,24,37].includes(i);
                    return <div key={i} className="rounded-sm" style={{ background: filled ? "#A855F7" : "transparent" }} />;
                  })}
                </div>
                <div className="scan-line">
                  <div className="h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #A855F7, transparent)", boxShadow: "0 0 8px #A855F7" }} />
                </div>
              </div>
            )}

            {scanned && (
              <div className="flex flex-col items-center gap-2 fade-up">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00704A, #00904E)" }}>
                  <span className="text-3xl">☕</span>
                </div>
                <p className="text-white font-bold text-sm">พบ Starbucks!</p>
                <p className="text-xs" style={{ color: "#A855F7" }}>กำลังเปิด Mini Program...</p>
              </div>
            )}
          </div>
        </div>

        {scanned ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "#A855F7" }}>
            <div className="w-4 h-4 border-2 rounded-full animate-spin"
              style={{ borderColor: "rgba(168,85,247,0.3)", borderTopColor: "#A855F7" }} />
            กำลังโหลด...
          </div>
        ) : (
          <button onClick={handleScan} disabled={scanning}
            className="pulse-ring relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base text-white active:scale-95 transition-transform disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            {scanning ? (
              <><div className="relative w-5 h-5 border-2 rounded-full animate-spin"
                style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} />
              <span className="relative">กำลังสแกน...</span></>
            ) : (
              <><Zap size={18} className="relative" fill="white" />
              <span className="relative">สแกน QR Code</span></>
            )}
          </button>
        )}

        <div className="rounded-2xl px-4 py-3 max-w-xs text-center"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
          <p className="text-xs" style={{ color: "rgba(192,132,252,0.7)" }}>
            💡 Demo — กดสแกนเพื่อเปิด Starbucks สยาม พารากอน
          </p>
        </div>
      </div>
    </div>
  );
}
