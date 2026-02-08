import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { LogOut, Store, Users, Settings, Shield, BarChart3, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const { locale } = useStore();
    const [location] = useLocation();
    const { t } = useTranslation();
    const isRTL = locale === 'ar';

    const adminLinks = [
        { href: "/admin/dashboard", label: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: BarChart3 },
        { href: "/admin/tenants", label: isRTL ? 'المتاجر' : 'Tenants', icon: Store },
        { href: "/admin/users", label: isRTL ? 'المستخدمين' : 'Users', icon: Users },
        { href: "/admin/categories", label: isRTL ? 'التصنيفات' : 'Categories', icon: Globe },
        { href: "/admin/settings", label: isRTL ? 'الإعدادات' : 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Admin Sidebar - Darker theme to distinguish from merchant */}
            <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0">
                {/* Admin Header/Logo */}
                <div className="p-6 border-b border-slate-700">
                    <Link href="/admin/dashboard">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">
                                    {isRTL ? 'وصلة' : 'Waslah'}
                                </h2>
                                <p className="text-xs text-slate-400">
                                    {isRTL ? 'لوحة المدير' : 'Admin Panel'}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {adminLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = location === link.href || (link.href !== "/admin/dashboard" && location.startsWith(link.href));
                        return (
                            <Link key={link.href} href={link.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200",
                                    isActive
                                        ? "bg-orange-600 text-white font-semibold"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                )}>
                                    <Icon className="h-5 w-5" />
                                    <span>{link.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-slate-700">
                    <Link href="/">
                        <Button variant="ghost" className="w-full justify-start text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
                            <Globe className="h-4 w-4 me-2" />
                            {isRTL ? 'عرض الموقع' : 'View Site'}
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-red-950 hover:text-red-300 mt-2">
                        <LogOut className="h-4 w-4 me-2" />
                        {isRTL ? 'تسجيل الخروج' : 'Logout'}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Admin Top Bar */}
                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {isRTL ? 'إدارة المنصة' : 'Platform Administration'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {isRTL ? 'إدارة النظام والمتاجر' : 'System and tenant management'}
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
