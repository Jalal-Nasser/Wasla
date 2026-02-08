import { useState } from 'react';
import { useStore } from '@/lib/store';
import { DashboardLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useOrders } from '@/hooks/use-orders';

export default function SellerOrders() {
  const { locale } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { data: orders } = useOrders();

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toString().includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'shipped': return 'bg-purple-100 text-purple-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    toast({
      title: isRTL ? 'تم تحديث الحالة' : 'Status Updated',
      description: isRTL ? 'تم تحديث حالة الطلب بنجاح' : 'Order status updated successfully',
    });
  };

  return (
    <DashboardLayout type="seller">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isRTL ? 'الطلبات' : 'Orders'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? 'إدارة طلبات العملاء' : 'Manage customer orders'}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: isRTL ? 'الكل' : 'All', value: orders?.length || 0, color: 'bg-blue-100 text-blue-700' },
            { label: isRTL ? 'قيد الانتظار' : 'Pending', value: orders?.filter(o => o.status === 'pending').length || 0, color: 'bg-yellow-100 text-yellow-700' },
            { label: isRTL ? 'قيد المعالجة' : 'Processing', value: orders?.filter(o => o.status === 'processing').length || 0, color: 'bg-purple-100 text-purple-700' },
            { label: isRTL ? 'تم التوصيل' : 'Delivered', value: orders?.filter(o => o.status === 'delivered').length || 0, color: 'bg-green-100 text-green-700' },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Package className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'ابحث عن طلب...' : 'Search orders...'}
                  className="ps-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? 'جميع الحالات' : 'All Status'}</SelectItem>
                  <SelectItem value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</SelectItem>
                  <SelectItem value="processing">{isRTL ? 'قيد المعالجة' : 'Processing'}</SelectItem>
                  <SelectItem value="shipped">{isRTL ? 'تم الشحن' : 'Shipped'}</SelectItem>
                  <SelectItem value="delivered">{isRTL ? 'تم التوصيل' : 'Delivered'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isRTL ? 'رقم الطلب' : 'Order #'}</TableHead>
                    <TableHead>{isRTL ? 'العميل' : 'Customer'}</TableHead>
                    <TableHead>{isRTL ? 'التاريخ' : 'Date'}</TableHead>
                    <TableHead>{isRTL ? 'الإجمالي' : 'Total'}</TableHead>
                    <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead className="text-center">{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-semibold">
                        #{order.id}
                      </TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="font-semibold">
                        {order.total} SAR
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)}`}>
                          <span className="me-1">{getStatusIcon(order.status)}</span>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isRTL ? 'تفاصيل الطلب' : 'Order Details'} #{selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'العميل' : 'Customer'}</p>
                  <p className="font-semibold">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'التاريخ' : 'Date'}</p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'الإجمالي' : 'Total'}</p>
                  <p className="font-semibold text-primary">{selectedOrder.total} SAR</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{isRTL ? 'الحالة' : 'Status'}</p>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{isRTL ? 'قيد الانتظار' : 'Pending'}</SelectItem>
                      <SelectItem value="processing">{isRTL ? 'قيد المعالجة' : 'Processing'}</SelectItem>
                      <SelectItem value="shipped">{isRTL ? 'تم الشحن' : 'Shipped'}</SelectItem>
                      <SelectItem value="delivered">{isRTL ? 'تم التوصيل' : 'Delivered'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">{isRTL ? 'المنتجات' : 'Products'}</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'الكمية' : 'Quantity'}: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">{item.price * item.quantity} SAR</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
