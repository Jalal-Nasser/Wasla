import { MerchantLayout } from "@/components/merchant/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function MerchantDashboard() {
    const { locale } = useStore();
    const isRTL = locale === 'ar';

    const stats = [
        {
            title: isRTL ? 'إجمالي المبيعات' : 'Total Sales',
            value: '125,450.00',
            currency: isRTL ? 'ر.س' : 'SAR',
            icon: DollarSign,
            trend: '+12.5%',
            trendUp: true,
        },
        {
            title: isRTL ? 'الطلبات' : 'Orders',
            value: '342',
            icon: ShoppingBag,
            trend: '+8.2%',
            trendUp: true,
        },
        {
            title: isRTL ? 'العملاء' : 'Customers',
            value: '156',
            icon: Users,
            trend: '+15.3%',
            trendUp: true,
        },
        {
            title: isRTL ? 'معدل التحويل' : 'Conversion Rate',
            value: '3.2%',
            icon: TrendingUp,
            trend: '+2.1%',
            trendUp: true,
        },
    ];

    return (
        <MerchantLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                    </h2>
                    <p className="text-muted-foreground">
                        {isRTL ? 'نظرة عامة على متجرك' : 'Overview of your store performance'}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
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
                                        <span className={stat.trendUp ? 'text-green-600' : 'text-red-600'}>
                                            {stat.trend}
                                        </span>
                                        {' '}{isRTL ? 'من الشهر الماضي' : 'from last month'}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>{isRTL ? 'الطلبات الأخيرة' : 'Recent Orders'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">{isRTL ? 'الطلب' : 'Order'} #1234</p>
                                    <p className="text-sm text-muted-foreground">{isRTL ? 'أحمد محمد' : 'Ahmed Mohammed'}</p>
                                </div>
                                <div className="text-end">
                                    <p className="font-bold">450.00 {isRTL ? 'ر.س' : 'SAR'}</p>
                                    <p className="text-sm text-green-600">{isRTL ? 'قيد التوصيل' : 'Delivering'}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">{isRTL ? 'الطلب' : 'Order'} #1233</p>
                                    <p className="text-sm text-muted-foreground">{isRTL ? 'فاطمة علي' : 'Fatima Ali'}</p>
                                </div>
                                <div className="text-end">
                                    <p className="font-bold">320.00 {isRTL ? 'ر.س' : 'SAR'}</p>
                                    <p className="text-sm text-blue-600">{isRTL ? 'قيد المعالجة' : 'Processing'}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">{isRTL ? 'الطلب' : 'Order'} #1232</p>
                                    <p className="text-sm text-muted-foreground">{isRTL ? 'خالد سعيد' : 'Khaled Said'}</p>
                                </div>
                                <div className="text-end">
                                    <p className="font-bold">890.00 {isRTL ? 'ر.س' : 'SAR'}</p>
                                    <p className="text-sm text-green-600">{isRTL ? 'تم التوصيل' : 'Delivered'}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MerchantLayout>
    );
}
