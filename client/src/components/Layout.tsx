import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Globe, User, LogOut, LayoutDashboard, Store, Package, Settings, Users } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const { locale, toggleLocale, cart } = useStore();
  const [location] = useLocation();
  const { toast } = useToast();

  const isRTL = locale === 'ar';
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-width flex h-16 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "right" : "left"}>
              <SheetHeader>
                <SheetTitle className="text-start">{isRTL ? 'القائمة' : 'Menu'}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </Link>
                <Link href="/dashboard/seller" className="text-lg font-medium hover:text-primary transition-colors">
                  {isRTL ? 'لوحة التاجر' : 'Seller Dashboard'}
                </Link>
                 <Link href="/dashboard/admin" className="text-lg font-medium hover:text-primary transition-colors">
                  {isRTL ? 'لوحة الإدارة' : 'Admin Dashboard'}
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              W
            </div>
            <span className="text-xl font-bold hidden sm:inline-block tracking-tight text-primary">
              {isRTL ? 'وصلة' : 'Waslah'}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={cn("hover:text-primary transition-colors", location === "/" && "text-primary")}>
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <Link href="/dashboard/seller" className={cn("hover:text-primary transition-colors", location.includes("/seller") && "text-primary")}>
              {isRTL ? 'لوحة التاجر' : 'Seller Dashboard'}
            </Link>
             <Link href="/dashboard/admin" className={cn("hover:text-primary transition-colors", location.includes("/admin") && "text-primary")}>
              {isRTL ? 'لوحة الإدارة' : 'Admin'}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLocale} className="rounded-full">
            <Globe className="h-4 w-4" />
          </Button>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px] bg-primary hover:bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button variant="default" size="sm" className="hidden sm:flex rounded-full px-6">
            {isRTL ? 'دخول' : 'Login'}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export function DashboardLayout({ children, type }: { children: React.ReactNode, type: 'seller' | 'admin' }) {
  const { locale } = useStore();
  const [location] = useLocation();
  const isRTL = locale === 'ar';

  const sellerLinks = [
    { href: "/dashboard/seller", label: isRTL ? "نظرة عامة" : "Overview", icon: LayoutDashboard },
    { href: "/dashboard/seller/orders", label: isRTL ? "الطلبات" : "Orders", icon: Package },
    { href: "/dashboard/seller/products", label: isRTL ? "المنتجات" : "Products", icon: Store },
    { href: "/dashboard/seller/settings", label: isRTL ? "الإعدادات" : "Settings", icon: Settings },
  ];

  const adminLinks = [
    { href: "/dashboard/admin", label: isRTL ? "المتاجر" : "Stores", icon: Store },
    { href: "/dashboard/admin/users", label: isRTL ? "المستخدمين" : "Users", icon: Users },
  ];

  const links = type === 'seller' ? sellerLinks : adminLinks;

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-e shadow-sm hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
        <div className="p-6">
          <h2 className="text-lg font-bold text-primary">
            {type === 'seller' ? (isRTL ? 'لوحة التاجر' : 'Seller Center') : (isRTL ? 'لوحة الإدارة' : 'Admin Panel')}
          </h2>
        </div>
        <div className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary font-semibold" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="h-4 w-4 me-2" />
            {isRTL ? 'تسجيل الخروج' : 'Logout'}
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
