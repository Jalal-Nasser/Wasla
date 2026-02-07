import { create } from 'zustand';
import { Product } from '@shared/schema';
import { persist } from 'zustand/middleware';

type Locale = 'ar' | 'en';

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  locale: Locale;
  toggleLocale: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      locale: 'ar',
      toggleLocale: () =>
        set((state) => {
          const newLocale = state.locale === 'ar' ? 'en' : 'ar';
          document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = newLocale;
          return { locale: newLocale };
        }),
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'waslah-storage',
    }
  )
);
