"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Check, Search } from "lucide-react";

const categories = [
  {
    id: "utility",
    label: "สาธารณูปโภค",
    icon: "⚡",
    color: "#F59E0B",
    bg: "#FEF3C7",
    providers: [
      { id: "mea",  name: "MEA การไฟฟ้านครหลวง", logo: "⚡", color: "#1E40AF", example: "3,200,000" },
      { id: "pea",  name: "PEA การไฟฟ้าส่วนภูมิภาค", logo: "🔌", color: "#0891B2", example: "5,100,000" },
      { id: "mwa",  name: "MWA การประปานครหลวง", logo: "💧", color: "#0EA5E9", example: "1,234,567" },
      { id: "pwa",  name: "PWA การประปาส่วนภูมิภาค", logo: "🚰", color: "#6366F1", example: "9,876,543" },
    ],
  },
  {
    id: "mobile",
    label: "ค่าโทรศัพท์",
    icon: "📱",
    color: "#3B82F6",
    bg: "#DBEAFE",
    providers: [
      { id: "ais",    name: "AIS",          logo: "📡", color: "#DC2626", example: "0812345678" },
      { id: "true",   name: "True Move H",  logo: "🔴", color: "#CC0000", example: "0898765432" },
      { id: "dtac",   name: "DTAC / NT",    logo: "🔵", color: "#0052CC", example: "0871234567" },
      { id: "ntmobile", name: "NT Mobile", logo: "🟢", color: "#16A34A", example: "0611234567" },
    ],
  },
  {
    id: "internet",
    label: "ค่า Internet",
    icon: "🌐",
    color: "#8B5CF6",
    bg: "#EDE9FE",
    providers: [
      { id: "aisfiber", name: "AIS Fibre",     logo: "🔴", color: "#DC2626", example: "AIS-1234567" },
      { id: "true_online", name: "True Online", logo: "🔴", color: "#CC0000", example: "8001234567" },
      { id: "3bb",    name: "3BB",            logo: "🟡", color: "#D97706", example: "3BB-789012" },
      { id: "nttelecom", name: "NT Telecom", logo: "🟢", color: "#16A34A", example: "NT-456789" },
    ],
  },
];

type Step = "category" | "provider" | "account" | "confirm" | "success";

export default function BillsPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("category");
  const [selectedCat, setSelectedCat] = useState<typeof categories[0] | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<typeof categories[0]["providers"][0] | null>(null);
  const [accountNo, setAccountNo] = useState("");
  const [processing, setProcessing] = useState(false);
  const [billInfo] = useState({ amount: 485, dueDate: "5 มิ.ย. 2569", period: "พ.ค. 2569" });

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep("success"); }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F5F0FF" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(124,58,237,0.08)" }}>
        <button onClick={() => step === "category" ? router.back() : setStep(step === "provider" ? "category" : step === "account" ? "provider" : step === "confirm" ? "account" : "category")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#F5F0FF" }}>
          <ArrowLeft size={18} style={{ color: "#7C3AED" }} />
        </button>
        <h1 className="font-black text-base flex-1" style={{ color: "#1A0A3D" }}>
          {step === "category" ? "จ่ายบิล" : step === "provider" ? selectedCat?.label : step === "account" ? selectedProvider?.name : step === "confirm" ? "ยืนยันการชำระ" : "ชำระเงินสำเร็จ"}
        </h1>
        {step === "category" && (
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5F0FF" }}>
            <Search size={16} style={{ color: "#7C3AED" }} />
          </button>
        )}
      </div>

      <div className="flex-1 px-4 py-5 space-y-3">

        {/* ── Category ── */}
        {step === "category" && (
          <>
            <p className="text-sm font-medium mb-4" style={{ color: "#9CA3AF" }}>เลือกประเภทบิลที่ต้องการชำระ</p>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setSelectedCat(cat); setStep("provider"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white text-left active:scale-98 transition-transform"
                style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: cat.bg }}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <p className="font-bold" style={{ color: "#1A0A3D" }}>{cat.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{cat.providers.length} ผู้ให้บริการ</p>
                </div>
                <ChevronRight size={18} style={{ color: "#D1D5DB" }} />
              </button>
            ))}
          </>
        )}

        {/* ── Provider ── */}
        {step === "provider" && selectedCat && (
          <>
            <p className="text-sm font-medium mb-4" style={{ color: "#9CA3AF" }}>เลือกผู้ให้บริการ</p>
            {selectedCat.providers.map((p) => (
              <button key={p.id} onClick={() => { setSelectedProvider(p); setStep("account"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white text-left active:scale-98 transition-transform"
                style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: p.color + "15" }}>
                  {p.logo}
                </div>
                <div className="flex-1">
                  <p className="font-bold" style={{ color: "#1A0A3D" }}>{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>ชำระได้ทันที · ไม่มีค่าธรรมเนียม</p>
                </div>
                <ChevronRight size={18} style={{ color: "#D1D5DB" }} />
              </button>
            ))}
          </>
        )}

        {/* ── Account Input ── */}
        {step === "account" && selectedProvider && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#7C3AED" }}>
                {selectedCat?.id === "mobile" || selectedCat?.id === "internet" ? "เลขโทรศัพท์ / เลขสัญญา" : "เลขผู้ใช้ / รหัสลูกค้า"}
              </p>
              <input
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder={`เช่น ${selectedProvider.example}`}
                className="w-full text-lg font-bold outline-none"
                style={{ color: "#1A0A3D" }}
                autoFocus
              />
            </div>
            <button
              disabled={accountNo.length < 5}
              onClick={() => setStep("confirm")}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              ตรวจสอบบิล
            </button>
          </div>
        )}

        {/* ── Confirm ── */}
        {step === "confirm" && selectedProvider && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: "1.5px dashed #EDE9FE" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: "#EDE9FE" }}>
                  {selectedProvider.logo}
                </div>
                <div>
                  <p className="font-black" style={{ color: "#1A0A3D" }}>{selectedProvider.name}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>เลขที่: {accountNo}</p>
                </div>
              </div>
              {[
                { label: "งวดที่ชำระ", value: billInfo.period },
                { label: "วันครบกำหนด", value: billInfo.dueDate },
                { label: "ยอดค้างชำระ", value: `฿${billInfo.amount.toLocaleString()}`, bold: true },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2">
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{row.label}</span>
                  <span className={`text-sm ${row.bold ? "font-black" : "font-medium"}`}
                    style={{ color: row.bold ? "#7C3AED" : "#1A0A3D" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#9CA3AF" }}>ชำระผ่าน</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#EDE9FE" }}>
                  <span className="text-sm">💜</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#1A0A3D" }}>PayX Wallet</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>ยอดคงเหลือ ฿2,500</p>
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#7C3AED" }}>
                  <Check size={11} className="text-white" />
                </div>
              </div>
            </div>

            <button onClick={handlePay} disabled={processing}
              className="relative overflow-hidden w-full py-4 rounded-2xl font-bold text-white text-base disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
              <div className="shimmer absolute inset-0 rounded-2xl" />
              {processing
                ? <span className="relative flex items-center justify-center gap-2"><div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} /> กำลังชำระ...</span>
                : <span className="relative">ชำระ ฿{billInfo.amount.toLocaleString()}</span>}
            </button>
          </div>
        )}

        {/* ── Success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center pt-10 gap-5 fade-up">
            <div className="w-24 h-24 rounded-full flex items-center justify-center pop-in"
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", boxShadow: "0 0 32px rgba(124,58,237,0.35)" }}>
              <Check size={44} className="text-white" strokeWidth={3} />
            </div>
            <div className="text-center">
              <h2 className="font-black text-2xl" style={{ color: "#1A0A3D" }}>ชำระเงินสำเร็จ!</h2>
              <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>{selectedProvider?.name}</p>
            </div>
            <div className="w-full bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.08)" }}>
              {[
                { label: "ยอดชำระ", value: `฿${billInfo.amount.toLocaleString()}` },
                { label: "เลขที่บัญชี", value: accountNo },
                { label: "วันที่ชำระ", value: "30 พ.ค. 2569, 14:32" },
                { label: "เลขอ้างอิง", value: `PX${Date.now().toString().slice(-8)}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid #F5F0FF" }}>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                  <span className="text-sm font-bold" style={{ color: "#1A0A3D" }}>{r.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/")}
              className="w-full py-4 rounded-2xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              กลับหน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
