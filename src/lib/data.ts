export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  price: number;
  description: string;
  emoji: string;
  popular?: boolean;
  customizable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  nameEn: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  emoji: string;
  address: string;
  tableNumber: string;
}

export const restaurant: Restaurant = {
  id: "rest-001",
  name: "Starbucks",
  nameEn: "Starbucks Coffee",
  cuisine: "Coffee & Beverages",
  rating: 4.9,
  reviews: 8420,
  deliveryTime: "5-10 นาที",
  emoji: "☕",
  address: "สยาม พารากอน ชั้น G",
  tableNumber: "12",
};

export const categories = ["แนะนำ", "Hot Drinks", "Cold Drinks", "Frappuccino®", "Tea", "Food"];

export const menuItems: MenuItem[] = [
  {
    id: "s1",
    name: "ลาเต้",
    nameEn: "Caffè Latte",
    category: "Hot Drinks",
    price: 155,
    description: "เอสเพรสโซ่ผสมนมสดอบอุ่น ฟองนมเนียนละเอียด",
    emoji: "☕",
    popular: true,
    customizable: true,
  },
  {
    id: "s2",
    name: "คาปูชิโน่",
    nameEn: "Cappuccino",
    category: "Hot Drinks",
    price: 145,
    description: "เอสเพรสโซ่ นมสด และฟองนมหนานุ่ม สัดส่วนคลาสสิก",
    emoji: "☕",
    popular: true,
    customizable: true,
  },
  {
    id: "s3",
    name: "แฟลต ไวท์",
    nameEn: "Flat White",
    category: "Hot Drinks",
    price: 165,
    description: "ริสตรัตโต้ช็อตกับไมโครโฟมนมสด เข้มข้นกลมกล่อม",
    emoji: "☕",
    customizable: true,
  },
  {
    id: "s4",
    name: "อเมริกาโน่",
    nameEn: "Caffè Americano",
    category: "Hot Drinks",
    price: 130,
    description: "เอสเพรสโซ่ผสมน้ำร้อน กลมกล่อมไม่ขม",
    emoji: "☕",
    customizable: true,
  },
  {
    id: "s5",
    name: "ไอซ์ลาเต้",
    nameEn: "Iced Caffè Latte",
    category: "Cold Drinks",
    price: 165,
    description: "เอสเพรสโซ่กับนมสดเย็น เสิร์ฟพร้อมน้ำแข็ง",
    emoji: "🥤",
    popular: true,
    customizable: true,
  },
  {
    id: "s6",
    name: "ไอซ์อเมริกาโน่",
    nameEn: "Iced Americano",
    category: "Cold Drinks",
    price: 140,
    description: "เอสเพรสโซ่ผสมน้ำเย็น สดชื่นเข้มข้น",
    emoji: "🥤",
    customizable: true,
  },
  {
    id: "s7",
    name: "โคลด์ บรูว์",
    nameEn: "Cold Brew",
    category: "Cold Drinks",
    price: 175,
    description: "กาแฟชงเย็นนาน 20 ชม. เนียนนุ่ม ไม่ขมฝาด",
    emoji: "🥤",
    popular: true,
    customizable: true,
  },
  {
    id: "s8",
    name: "ไนโตร โคลด์ บรูว์",
    nameEn: "Nitro Cold Brew",
    category: "Cold Drinks",
    price: 185,
    description: "โคลด์บรูว์เติมไนโตรเจน ครีมมี่ฟองนุ่มเนียน",
    emoji: "🥤",
    customizable: false,
  },
  {
    id: "s9",
    name: "จาวา ชิป ฟรัปปูชิโน่",
    nameEn: "Java Chip Frappuccino®",
    category: "Frappuccino®",
    price: 195,
    description: "โมคาซอส ชิปช็อกโกแลต ปั่นกับนมและน้ำแข็ง ท็อปวิปครีม",
    emoji: "🧋",
    popular: true,
    customizable: true,
  },
  {
    id: "s10",
    name: "คาราเมล ฟรัปปูชิโน่",
    nameEn: "Caramel Frappuccino®",
    category: "Frappuccino®",
    price: 185,
    description: "คาราเมลซอส กาแฟ นม น้ำแข็ง ราดคาราเมลด้านบน",
    emoji: "🧋",
    popular: true,
    customizable: true,
  },
  {
    id: "s11",
    name: "โมคา ฟรัปปูชิโน่",
    nameEn: "Mocha Frappuccino®",
    category: "Frappuccino®",
    price: 185,
    description: "โมคาซอสผสมกาแฟ นม น้ำแข็ง วิปครีมหอม",
    emoji: "🧋",
    customizable: true,
  },
  {
    id: "s12",
    name: "สตรอเบอร์รี่ ครีม ฟรัปปูชิโน่",
    nameEn: "Strawberry Cream Frappuccino®",
    category: "Frappuccino®",
    price: 175,
    description: "ซอสสตรอเบอร์รี่ นมสด น้ำแข็ง ไม่มีกาแฟ",
    emoji: "🧋",
    customizable: true,
  },
  {
    id: "s13",
    name: "ชาย ลาเต้",
    nameEn: "Chai Tea Latte",
    category: "Tea",
    price: 155,
    description: "ชาชายเข้มข้นกับนมสดอุ่น หอมเครื่องเทศ",
    emoji: "🍵",
    popular: true,
    customizable: true,
  },
  {
    id: "s14",
    name: "มัทฉะ ลาเต้",
    nameEn: "Matcha Tea Latte",
    category: "Tea",
    price: 165,
    description: "ผงมัทฉะญี่ปุ่นคุณภาพสูงกับนมสดอุ่น",
    emoji: "🍵",
    popular: true,
    customizable: true,
  },
  {
    id: "s15",
    name: "กรีนที ลาเต้",
    nameEn: "Green Tea Latte",
    category: "Tea",
    price: 155,
    description: "ชาเขียวญี่ปุ่นผสมนมสด หวานอ่อน กลมกล่อม",
    emoji: "🍵",
    customizable: true,
  },
  {
    id: "s16",
    name: "บัตเตอร์ ครัวซองต์",
    nameEn: "Butter Croissant",
    category: "Food",
    price: 85,
    description: "ครัวซองต์เนยแท้ กรอบนอกนุ่มใน อบสดใหม่ทุกวัน",
    emoji: "🥐",
    popular: true,
  },
  {
    id: "s17",
    name: "ชีสเค้กนิวยอร์ก",
    nameEn: "New York Cheesecake",
    category: "Food",
    price: 175,
    description: "ชีสเค้กเนื้อแน่นสไตล์นิวยอร์ก บนฐานบิสกิต",
    emoji: "🍰",
    popular: true,
  },
  {
    id: "s18",
    name: "แซนด์วิชทูน่า",
    nameEn: "Tuna Melt Sandwich",
    category: "Food",
    price: 195,
    description: "ทูน่าผสมมายองเนส มะเขือเทศ ชีสเมลต์",
    emoji: "🥪",
  },
  {
    id: "s19",
    name: "ช็อกโกแลต มัฟฟิน",
    nameEn: "Chocolate Muffin",
    category: "Food",
    price: 95,
    description: "มัฟฟินช็อกโกแลตชิปอบสด เนื้อ촉촉",
    emoji: "🧁",
  },
];

export const paymentMethods = [
  { id: "starbucks_card", name: "Starbucks Card", emoji: "🟢", balance: 850 },
  { id: "promptpay", name: "PromptPay", emoji: "📱", balance: null },
  { id: "credit_card", name: "บัตรเครดิต/เดบิต", emoji: "💳", balance: null },
  { id: "cash", name: "เงินสด", emoji: "💵", balance: null },
];
