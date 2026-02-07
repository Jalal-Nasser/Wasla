import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useCreateOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, locale, clearCart } = useStore();
  const isRTL = locale === 'ar';
  const { mutate: checkout, isPending } = useCreateOrder();
  const { toast } = useToast();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleCheckout = () => {
    checkout(
      { items: cart, total }, 
      {
        onSuccess: () => {
          toast({
            title: isRTL ? "تم الطلب بنجاح" : "Order Placed Successfully",
            description: isRTL ? "شكراً لتسوقك معنا" : "Thank you for shopping with us",
          });
          clearCart();
        }
      }
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-4">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <ShoppingBagIcon className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold">{isRTL ? 'سلة التسوق فارغة' : 'Your Cart is Empty'}</h2>
        <Link href="/">
          <Button size="lg" className="rounded-full">
            {isRTL ? 'تصفح المنتجات' : 'Browse Products'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-width py-12">
      <h1 className="text-3xl font-bold mb-8">{isRTL ? 'سلة التسوق' : 'Shopping Cart'}</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-xl bg-card shadow-sm">
              <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{isRTL ? item.nameAr : item.nameEn}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2 border rounded-lg p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="font-bold">
                    {item.price * item.quantity} {item.currency}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="font-bold text-lg mb-4">{isRTL ? 'ملخص الطلب' : 'Order Summary'}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span>{subtotal.toFixed(2)} {cart[0].currency}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{isRTL ? 'الضريبة (15%)' : 'Tax (15%)'}</span>
                <span>{tax.toFixed(2)} {cart[0].currency}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
                <span>{total.toFixed(2)} {cart[0].currency}</span>
              </div>
            </div>

            <Button 
              className="w-full rounded-xl py-6 text-lg font-bold" 
              onClick={handleCheckout}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  {isRTL ? 'إتمام الشراء' : 'Checkout'}
                  {isRTL ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}
