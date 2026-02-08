import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/lib/store';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { t } = useTranslation();
  const { locale, cart, clearCart } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const shipping = 50; // Flat shipping rate
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `ORD-${Math.floor(Math.random() * 100000)}`;
    setOrderNumber(orderNum);
    setOrderPlaced(true);
    toast({
      title: t('checkout.orderConfirmed'),
      description: `${t('checkout.orderNumber')}: ${orderNum}`,
    });
    setTimeout(() => {
      clearCart();
      setLocation('/');
    }, 3000);
  };

  // Redirect if cart is empty
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container-width py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">{t('cart.empty')}</h2>
        <Link href="/">
          <Button>{t('cart.continueShopping')}</Button>
        </Link>
      </div>
    );
  }

  // Order confirmation screen
  if (orderPlaced) {
    return (
      <div className="container-width py-16 text-center">
        <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-primary">{t('checkout.orderConfirmed')}</h1>
        <p className="text-xl mb-4 text-muted-foreground">
          {t('checkout.orderNumber')}: <span className="font-bold text-foreground">{orderNumber}</span>
        </p>
        <p className="text-muted-foreground mb-8">
          {isRTL ? 'سيتم إعادة توجيهك للصفحة الرئيسية...' : 'Redirecting to home page...'}
        </p>
      </div>
    );
  }

  return (
    <div className="container-width py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('checkout.title')}</h1>
        <p className="text-muted-foreground">
          {isRTL ? 'أكمل عملية الشراء' : 'Complete your purchase'}
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid gap-6 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('checkout.shippingInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('checkout.fullName')}</Label>
                  <Input id="fullName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('checkout.email')}</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('checkout.phone')}</Label>
                  <Input id="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t('checkout.city')}</Label>
                  <Input id="city" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('checkout.address')}</Label>
                <Input id="address" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">{t('checkout.country')}</Label>
                  <Input id="country" defaultValue={isRTL ? 'السعودية' : 'Saudi Arabia'} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">{t('checkout.zipCode')}</Label>
                  <Input id="zipCode" required />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('checkout.paymentInfo')}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'معلومات الدفع آمنة ومشفرة' : 'Your payment information is secure and encrypted'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">{t('checkout.cardNumber')}</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">{t('checkout.expiryDate')}</Label>
                  <Input id="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">{t('checkout.cvv')}</Label>
                  <Input id="cvv" placeholder="123" maxLength={3} required />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>{t('checkout.orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">
                        {isRTL ? item.nameAr : item.nameEn}
                      </p>
                      <p className="text-muted-foreground">
                        {t('cart.quantity')}: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold">
                      {item.price * item.quantity} {t('storefront.currency')}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('cart.subtotal')}</span>
                  <span>{subtotal.toFixed(2)} {t('storefront.currency')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('cart.tax')}</span>
                  <span>{tax.toFixed(2)} {t('storefront.currency')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('cart.shipping')}</span>
                  <span>{shipping.toFixed(2)} {t('storefront.currency')}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-primary">{total.toFixed(2)} {t('storefront.currency')}</span>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t('checkout.placeOrder')}
              </Button>

              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  {t('common.back')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
