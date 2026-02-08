import { Link, useLocation } from "wouter";
import { ShoppingCart, Globe, Menu, X, Info, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const { locale, toggleLocale, cart } = useStore();
  const [location] = useLocation();
  const { t } = useTranslation();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const isRTL = locale === 'ar';
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Hide cart on merchant/admin dashboards
  const isMerchantDashboard = location.startsWith('/merchant');
  const isAdminDashboard = location.startsWith('/admin');
  const showCart = !isMerchantDashboard && !isAdminDashboard;
  const isHomePage = location === '/';

  return (
    <>
      {/* Top Announcement Bar - Orange */}
      {showAnnouncement && (
        <div className="bg-[#FF7F00] text-white py-2.5 px-4 relative">
          <div className="container-width flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            <p className="text-sm font-medium">
              {isRTL
                ? 'أنشئ متجرك الإلكتروني مجاناً وابدأ بالبيع خلال دقائق!'
                : 'Create your online store for free and start selling in minutes!'}
            </p>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute end-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation - Blue #1f79c2 */}
      <nav className="sticky top-0 z-40 w-full border-b bg-[#1f79c2] shadow-sm">
        <div className="container-width">
          <div className="flex h-24 items-center justify-between">

            {/* Left Section: Mobile Menu + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side={isRTL ? "right" : "left"}>
                  <div className="flex flex-col gap-4 mt-8">
                    <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                      {isRTL ? 'الرئيسية' : 'Home'}
                    </Link>
                    <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">
                      {isRTL ? 'المتاجر' : 'Stores'}
                    </Link>
                    <Link href="/pricing" className="text-lg font-medium hover:text-primary transition-colors">
                      {isRTL ? 'الأسعار' : 'Pricing'}
                    </Link>
                    <Link href="#features" className="text-lg font-medium hover:text-primary transition-colors">
                      {isRTL ? 'المميزات' : 'Features'}
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <img
                  src="/logo.png"
                  alt="Waslah"
                  className="h-24 w-auto transition-transform group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Center Section: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link
                href="/"
                className={cn(
                  "text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200",
                  location === "/" && "bg-white/20 font-semibold"
                )}
              >
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
              <Link
                href="/products"
                className={cn(
                  "text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200",
                  location === "/products" && "bg-white/20 font-semibold"
                )}
              >
                {isRTL ? 'المتاجر' : 'Stores'}
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200",
                  location === "/pricing" && "bg-white/20 font-semibold"
                )}
              >
                {isRTL ? 'الأسعار' : 'Pricing'}
              </Link>
              <Link
                href="#features"
                className="text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
              >
                {isRTL ? 'المميزات' : 'Features'}
              </Link>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLocale}
                className="text-white hover:bg-white/20 font-medium transition-all duration-200"
              >
                {locale === 'ar' ? 'En' : 'عربي'}
              </Button>

              {/* Cart */}
              {showCart && (
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20 transition-all duration-200">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] bg-[#FF7F00] hover:bg-[#FF7F00] border-2 border-white animate-pulse">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}

              {/* Login Button */}
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-white border border-white/30 hover:bg-white hover:text-[#6ab8f7] transition-all duration-200"
                >
                  <User className="me-2 h-4 w-4" />
                  {t('common.login')}
                </Button>
              </Link>

              {/* Create Store - Orange Button */}
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="hidden sm:inline-flex bg-[#FF7F00] hover:bg-[#ff6600] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Store className="me-2 h-4 w-4" />
                  {isRTL ? 'أنشئ متجرك' : 'Create Store'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
