import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useOrders } from '@/hooks/use-orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Package, Eye, Download } from 'lucide-react';

export default function AccountOrders() {
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  const { data: orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders?.filter(order =>
    order.id.toString().includes(searchQuery) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container-width py-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{isRTL ? 'طلباتي' : 'My Orders'}</h1>
          <p className="text-muted-foreground mb-8">
            {isRTL ? 'تتبع وإدارة طلباتك' : 'Track and manage your orders'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'ابحث عن طلب...' : 'Search orders...'}
                  className="ps-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">{isRTL ? 'الكل' : 'All'}</TabsTrigger>
                <TabsTrigger value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</TabsTrigger>
                <TabsTrigger value="shipped">{isRTL ? 'تم الشحن' : 'Shipped'}</TabsTrigger>
                <TabsTrigger value="delivered">{isRTL ? 'تم التوصيل' : 'Delivered'}</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">
                              {isRTL ? 'الطلب' : 'Order'} #{order.id}
                            </h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-end">
                          <p className="text-2xl font-bold text-primary">{order.total} SAR</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="me-2 h-4 w-4" />
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="me-2 h-4 w-4" />
                          {isRTL ? 'تحميل الفاتورة' : 'Download Invoice'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Other tabs can filter by status */}
              <TabsContent value="pending">
                {/* Filter pending orders */}
              </TabsContent>
              <TabsContent value="shipped">
                {/* Filter shipped orders */}
              </TabsContent>
              <TabsContent value="delivered">
                {/* Filter delivered orders */}
              </TabsContent>
            </Tabs>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  {isRTL ? 'لا توجد طلبات' : 'No orders found'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
