"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Star, MapPin, Plus, Minus, X, Sliders } from "lucide-react";
import { useStore, useCartTotal } from "@/lib/store";
import { menuItems, categories, restaurant, MenuItem } from "@/lib/data";
import MiniProgramShell from "@/components/MiniProgramShell";

const SIZES = ["Tall", "Grande", "Venti"];
const SIZE_EXTRA = [0, 20, 40];

export default function MenuPage() {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const [activeCategory, setActiveCategory] = useState("แนะนำ");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState(1);
  const total = useCartTotal(state.cart);
  const cartCount = state.cart.reduce((s, c) => s + c.quantity, 0);

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "แนะนำ" ? item.popular : item.category === activeCategory;
    const matchSearch = !search || item.name.includes(search) || item.nameEn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getQty = (id: string) => state.cart.find((c) => c.item.id === id)?.quantity ?? 0;

  return (
    <MiniProgramShell appName="Starbucks" appEmoji="☕" accentColor="#1E3932">
      <div className="flex flex-col" style={{ background: "#F2F0EB", minHeight: "100%" }}>

        {/* Restaurant hero */}
        <div className="relative overflow-hidden px-5 pt-4 pb-8"
          style={{ background: "linear-gradient(155deg, #1E3932 0%, #006241 60%, #00704A 100%)" }}>
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #CBA258, transparent)" }} />

          <div className="rounded-2xl p-3.5 flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              {restaurant.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-sm">{restaurant.nameEn}</h2>
              <p className="text-white/50 text-xs">{restaurant.cuisine}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs" style={{ color: "#F1D592" }}>
                  <Star size={10} fill="currentColor" />
                  {restaurant.rating} ({restaurant.reviews.toLocaleString()})
                </span>
                <span className="flex items-center gap-1 text-white/50 text-xs">
                  <MapPin size={10} />
                  {restaurant.address}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
              style={{ background: "rgba(203,162,88,0.2)", color: "#F1D592" }}>
              โต๊ะ {state.tableNumber || "12"}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: "#F2F0EB" }}>
              <Search size={15} style={{ color: "#00704A" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาเมนู..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400" />
            </div>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#D4E9E2" }}>
              <Sliders size={16} style={{ color: "#00704A" }} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-2.5 flex gap-2 overflow-x-auto bg-white border-b border-gray-100 sticky top-14 z-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={activeCategory === cat
                ? { background: "#1E3932", color: "white" }
                : { background: "#D4E9E2", color: "#006241" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="px-4 py-4 space-y-3 pb-32">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm">ไม่พบเมนูที่ค้นหา</p>
            </div>
          )}
          {filtered.map((item) => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-3"
                style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
                <button onClick={() => { setSelected(item); setSelectedSize(1); }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 active:scale-95 transition-transform"
                  style={{ background: "#D4E9E2" }}>
                  {item.emoji}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                    {item.popular && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(203,162,88,0.15)", color: "#9B7121" }}>
                        ★ ยอดนิยม
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                  <p className="font-bold text-sm mt-1" style={{ color: "#00704A" }}>฿{item.price}</p>
                </div>
                <div className="shrink-0">
                  {qty === 0 ? (
                    <button onClick={() => dispatch({ type: "ADD_ITEM", item })}
                      className="w-9 h-9 rounded-xl flex items-center justify-center active:scale-90 transition-transform"
                      style={{ background: "#00704A" }}>
                      <Plus size={17} className="text-white" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: qty - 1 })}
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "#D4E9E2" }}>
                        <Minus size={14} style={{ color: "#00704A" }} />
                      </button>
                      <span className="text-sm font-black w-4 text-center" style={{ color: "#1E3932" }}>{qty}</span>
                      <button onClick={() => dispatch({ type: "ADD_ITEM", item })}
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "#00704A" }}>
                        <Plus size={14} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart bar */}
        {cartCount > 0 && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 pb-6 pt-3"
            style={{ background: "linear-gradient(to top, #F2F0EB 70%, transparent)" }}>
            <button onClick={() => router.push("/cart")}
              className="relative overflow-hidden w-full text-white rounded-2xl py-4 flex items-center justify-between px-5 slide-up"
              style={{ background: "linear-gradient(135deg, #1E3932, #006241)", boxShadow: "0 8px 24px rgba(30,57,50,0.35)" }}>
              <div className="shimmer absolute inset-0 rounded-2xl" />
              <span className="relative rounded-full px-2.5 py-1 text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                {cartCount} รายการ
              </span>
              <span className="relative flex items-center gap-2 font-bold">
                <ShoppingBag size={17} />
                ดูตะกร้า
              </span>
              <span className="relative font-black">฿{total.toLocaleString()}</span>
            </button>
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(14,26,20,0.75)" }}
            onClick={() => setSelected(null)}>
            <div className="bg-white w-full max-w-sm mx-auto rounded-t-3xl p-6 slide-up"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end mb-2">
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#D4E9E2" }}>
                  <X size={16} style={{ color: "#006241" }} />
                </button>
              </div>
              <div className="text-center text-6xl mb-4">{selected.emoji}</div>
              <h3 className="font-black text-gray-800 text-xl text-center">{selected.name}</h3>
              <p className="text-gray-400 text-sm text-center mt-1">{selected.nameEn}</p>
              <p className="text-gray-500 text-sm text-center mt-3 leading-relaxed">{selected.description}</p>

              {selected.customizable && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-500 mb-2">เลือกขนาด</p>
                  <div className="flex gap-2">
                    {SIZES.map((sz, i) => (
                      <button key={sz} onClick={() => setSelectedSize(i)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                        style={selectedSize === i
                          ? { background: "#1E3932", color: "white" }
                          : { background: "#D4E9E2", color: "#006241" }}>
                        {sz}<br />
                        <span className="font-normal opacity-70">{i === 0 ? "–" : `+฿${SIZE_EXTRA[i]}`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                <span className="text-2xl font-black" style={{ color: "#00704A" }}>
                  ฿{selected.price + SIZE_EXTRA[selectedSize]}
                </span>
                <button onClick={() => { dispatch({ type: "ADD_ITEM", item: selected }); setSelected(null); }}
                  className="px-8 py-3 rounded-xl font-bold text-white active:scale-95 transition-transform"
                  style={{ background: "linear-gradient(135deg, #1E3932, #006241)" }}>
                  + เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MiniProgramShell>
  );
}
