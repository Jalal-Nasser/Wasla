import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { Store, Users, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
    const { locale } = useStore();
    const isRTL = locale === 'ar';

    const platformStats = [
        {
            title: isRTL ? 'إجمالي المتاجر' : 'Total Tenants',
            value: '45',
            icon: Store,
            description: isRTL ? '38 متجر نشط' : '38 active stores',
        },
        {
            title: isRTL ? 'إجمالي المستخدمين' : 'Total Users',
            value: '1,250',
            icon: Users,
            description: isRTL ? '856 مستخدم نشط' : '856 active users',
        },
        {
            title: isRTL ? 'إيرادات المنصة' : 'Platform Revenue',
            value: '450,000',
            currency: isRTL ? 'ر.س' : 'SAR',
            icon: DollarSign,
            description: isRTL ? 'هذا الشهر' : 'This month',
        },
        {
            title: isRTL ? 'حالة النظام' : 'System Status',
            value: isRTL ? 'ممتاز' : 'Excellent',
            icon: Activity,
            description: '99.9% uptime',
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isRTL ? 'لوحة تحكم المدير' : 'Admin Dashboard'}
                    </h2>
                    <p className="text-muted-foreground">
                        {isRTL ? 'نظرة عامة على المنصة' : 'Platform overview and management'}
                    </p>
                </div>

                {/* Platform Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {platformStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.value} {stat.currency || ''}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Tenants */}
                <Card>
                    <CardHeader>
                        <CardTitle>{isRTL ? 'المتاجر الجديدة' : 'Recent Tenants'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Store className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{isRTL ? 'متجر الإلكترونيات' : 'Electronics Store'}</p>
                                        <p className="text-sm text-muted-foreground">store-electronics.waslah.sa</p>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <p className="text-sm font-medium text-green-600">{isRTL ? 'نشط' : 'Active'}</p>
                                    <p className="text-xs text-muted-foreground">{isRTL ? 'تم الإنشاء اليوم' : 'Created today'}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                        <Store className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{isRTL ? 'متجر الأزياء' : 'Fashion Store'}</p>
                                        <p className="text-sm text-muted-foreground">store-fashion.waslah.sa</p>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <p className="text-sm font-medium text-green-600">{isRTL ? 'نشط' : 'Active'}</p>
                                    <p className="text-xs text-muted-foreground">{isRTL ? 'أمس' : 'Yesterday'}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
