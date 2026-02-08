import { Product, Category, Order, Tenant } from "@shared/schema";

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, nameAr: "إلكترونيات", nameEn: "Electronics", icon: "Smartphone" },
  { id: 2, nameAr: "أزياء", nameEn: "Fashion", icon: "Shirt" },
  { id: 3, nameAr: "عطور", nameEn: "Perfumes", icon: "SprayCan" },
  { id: 4, nameAr: "منزل", nameEn: "Home", icon: "Home" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    nameAr: "آيفون 15 برو ماكس",
    nameEn: "iPhone 15 Pro Max",
    price: 4899,
    currency: "SAR",
    descriptionAr: "أحدث هاتف من آبل مع معالج A17 Pro.",
    descriptionEn: "Latest Apple phone with A17 Pro chip.",
    imageUrl: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80",
    category: "Electronics",
    stock: 15,
    isDigital: false,
  },
  {
    id: 2,
    nameAr: "عطر ليذر فاخر",
    nameEn: "Luxury Leather Perfume",
    price: 350,
    currency: "SAR",
    descriptionAr: "رائحة الجلود الفاخرة مع لمسة من العنبر.",
    descriptionEn: "Luxurious leather scent with a touch of amber.",
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    category: "Perfumes",
    stock: 50,
    isDigital: false,
  },
  {
    id: 3,
    nameAr: "سماعة رأس بلوتوث",
    nameEn: "Bluetooth Headset",
    price: 199,
    currency: "SAR",
    descriptionAr: "عزل ضوضاء ممتاز وجودة صوت عالية.",
    descriptionEn: "Excellent noise cancellation and high sound quality.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
    stock: 30,
    isDigital: false,
  },
  {
    id: 4,
    nameAr: "كورس تصميم واجهات المستخدم",
    nameEn: "UI Design Course",
    price: 99,
    currency: "SAR",
    descriptionAr: "تعلم تصميم واجهات المستخدم من الصفر.",
    descriptionEn: "Learn UI Design from scratch.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d22?w=800&q=80",
    category: "Digital",
    stock: 1000,
    isDigital: true,
  },
  {
    id: 5,
    nameAr: "كرسي مكتب مريح",
    nameEn: "Ergonomic Office Chair",
    price: 850,
    currency: "SAR",
    descriptionAr: "كرسي مريح لساعات العمل الطويلة.",
    descriptionEn: "Comfortable chair for long working hours.",
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
    category: "Home",
    stock: 10,
    isDigital: false,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    customerName: "أحمد محمد",
    total: 5249,
    status: "delivered",
    date: "2024-05-15",
    items: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }],
  },
  {
    id: 1002,
    customerName: "سارة خالد",
    total: 350,
    status: "shipped",
    date: "2024-05-18",
    items: [{ productId: 2, quantity: 1 }],
  },
  {
    id: 1003,
    customerName: "شركة التقنية",
    total: 2550,
    status: "pending",
    date: "2024-05-20",
    items: [{ productId: 5, quantity: 3 }],
  },
];

export const MOCK_TENANTS: Tenant[] = [
  { id: 1, name: "متجر الفخامة", domain: "luxury.waslah.com", plan: "pro", status: "active" },
  { id: 2, name: "تقنيات المستقبل", domain: "tech.waslah.com", plan: "basic", status: "active" },
  { id: 3, name: "عطور الشرق", domain: "perfumes.waslah.com", plan: "enterprise", status: "active" },
];

export const MOCK_ADDRESSES: any[] = [
  {
    id: 1,
    fullName: "أحمد محمد العلي",
    phone: "+966 50 123 4567",
    city: "الرياض",
    district: "حي السليمانية",
    street: "شارع الملك فهد",
    buildingNumber: "1234",
    postalCode: "12345",
    isDefault: true,
  },
  {
    id: 2,
    fullName: "أحمد محمد العلي",
    phone: "+966 50 123 4567",
    city: "جدة",
    district: "حي الحمراء",
    street: "شارع التحلية",
    buildingNumber: "5678",
    postalCode: "23456",
    isDefault: false,
  },
];

export const MOCK_WISHLIST_ITEMS: number[] = [1, 2, 3];

export interface WalletTransaction {
  id: number;
  type: "refund" | "purchase" | "cashback" | "bonus";
  amount: number;
  description: string;
  date: string;
}

export const MOCK_WALLET_BALANCE = 245.50;

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 1,
    type: "cashback",
    amount: 25.50,
    description: "مكافأة شراء أكثر من 500 ريال",
    date: "2024-05-20",
  },
  {
    id: 2,
    type: "purchase",
    amount: -350,
    description: "شراء #1002",
    date: "2024-05-18",
  },
  {
    id: 3,
    type: "refund",
    amount: 199,
    description: "استرجاع طلب #989",
    date: "2024-05-15",
  },
  {
    id: 4,
    type: "bonus",
    amount: 50,
    description: "مكافأة تسجيل العضوية",
    date: "2024-05-01",
  },
];
