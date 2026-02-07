import { useStore } from "@/lib/store";
import { DashboardLayout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrders } from "@/hooks/use-orders";

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export default function SellerDashboard() {
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  const { data: orders } = useOrders();

  const stats = [
    { title: isRTL ? 'إجمالي المبيعات' : 'Total Sales', value: '12,340 SAR', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { title: isRTL ? 'الطلبات' : 'Orders', value: orders?.length || 0, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: isRTL ? 'المنتجات' : 'Products', value: '45', icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: isRTL ? 'نسبة النمو' : 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <DashboardLayout type="seller">
      <div className="space-y-8 animate-in-up">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{isRTL ? 'نظرة عامة' : 'Overview'}</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle>{isRTL ? 'تحليل المبيعات' : 'Sales Analytics'}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00BFA5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#00BFA5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-none shadow-sm">
             <CardHeader>
              <CardTitle>{isRTL ? 'أحدث الطلبات' : 'Recent Orders'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders?.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{order.total} SAR</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
