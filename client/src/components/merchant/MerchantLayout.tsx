import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Store, Package, Settings, Users, TrendingUp, Tag, FileText } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

export function MerchantLayout({ children }: { children: React.ReactNode }) {
    const { locale } = useStore();
    const [location] = useLocation();
    const { t } = useTranslation();
    const isRTL = locale === 'ar';

    const merchantLinks = [
        { href: "/merchant/dashboard", label: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: LayoutDashboard },
        { href: "/merchant/products", label: isRTL ? 'المنتجات' : 'Products', icon: Store },
        { href: "/merchant/orders", label: isRTL ? 'الطلبات' : 'Orders', icon: Package },
        { href: "/merchant/customers", label: isRTL ? 'العملاء' : 'Customers', icon: Users },
        { href: "/merchant/marketing", label: isRTL ? 'التسويق' : 'Marketing', icon: TrendingUp },
        { href: "/merchant/reports", label: isRTL ? 'التقارير' : 'Reports', icon: FileText },
        { href: "/merchant/settings", label: isRTL ? 'الإعدادات' : 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-muted/20 flex">
            {/* Merchant Sidebar */}
            <aside className="w-64 bg-card border-e shadow-sm flex flex-col h-screen sticky top-0">
                {/* Merchant Header/Logo */}
                <div className="p-6 border-b">
                    <Link href="/merchant/dashboard">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                                W
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-primary">
                                    {isRTL ? 'وصلة' : 'Waslah'}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {isRTL ? 'لوحة التاجر' : 'Merchant Panel'}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {merchantLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location === link.href || (link.href !== "/merchant/dashboard" && location.startsWith(link.href));
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
                    })}\n        </div>

                {/* Logout */}
                <div className="p-4 border-t">
                    <Link href="/">
                        <Button variant="ghost" className="w-full justify-start text-sm">
                            <Store className="h-4 w-4 me-2" />
                            {isRTL ? 'عرض المتجر' : 'View Store'}
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive mt-2">
                        <LogOut className="h-4 w-4 me-2" />
                        {isRTL ? 'تسجيل الخروج' : 'Logout'}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Merchant Top Bar */}
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {isRTL ? 'مرحباً' : 'Welcome'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isRTL ? 'إدارة متجرك' : 'Manage your store'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                {locale === 'ar' ? 'EN' : 'عربي'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
