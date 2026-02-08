import { useState } from 'react';
import { useStore } from '@/lib/store';
import { DashboardLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Store, Palette, Bell, CreditCard, Truck, Globe } from 'lucide-react';

export default function SellerSettings() {
  const { locale } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const [storeSettings, setStoreSettings] = useState({
    nameEn: 'My Store',
    nameAr: 'متجري',
    descriptionEn: 'Welcome to my store',
    descriptionAr: 'مرحباً بكم في متجري',
    email: 'store@example.com',
    phone: '+966 50 000 0000',
    address: 'Riyadh, Saudi Arabia',
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMessages: true,
    marketing: false,
    productAlerts: true,
  });

  const handleSaveStore = () => {
    toast({
      title: isRTL ? 'تم الحفظ' : 'Saved',
      description: isRTL ? 'تم حفظ إعدادات المتجر بنجاح' : 'Store settings saved successfully',
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: isRTL ? 'تم الحفظ' : 'Saved',
      description: isRTL ? 'تم حفظ إعدادات الإشعارات بنجاح' : 'Notification settings saved successfully',
    });
  };

  return (
    <DashboardLayout type="seller">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isRTL ? 'الإعدادات' : 'Settings'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isRTL ? 'إدارة إعدادات متجرك وحسابك' : 'Manage your store and account settings'}
          </p>
        </div>

        <Tabs defaultValue="store" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="store">
              <Store className="h-4 w-4 me-2" />
              {isRTL ? 'المتجر' : 'Store'}
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 me-2" />
              {isRTL ? 'المظهر' : 'Appearance'}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 me-2" />
              {isRTL ? 'الإشعارات' : 'Notifications'}
            </TabsTrigger>
            <TabsTrigger value="shipping">
              <Truck className="h-4 w-4 me-2" />
              {isRTL ? 'الشحن' : 'Shipping'}
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'معلومات المتجر' : 'Store Information'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'معلومات أساسية عن متجرك' : 'Basic information about your store'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'اسم المتجر (إنجليزي)' : 'Store Name (English)'}</Label>
                    <Input
                      value={storeSettings.nameEn}
                      onChange={(e) => setStoreSettings({...storeSettings, nameEn: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'اسم المتجر (عربي)' : 'Store Name (Arabic)'}</Label>
                    <Input
                      value={storeSettings.nameAr}
                      onChange={(e) => setStoreSettings({...storeSettings, nameAr: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                    <Textarea
                      value={storeSettings.descriptionEn}
                      onChange={(e) => setStoreSettings({...storeSettings, descriptionEn: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                    <Textarea
                      value={storeSettings.descriptionAr}
                      onChange={(e) => setStoreSettings({...storeSettings, descriptionAr: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                    <Input
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الهاتف' : 'Phone'}</Label>
                    <Input
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
                  <Input
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveStore}>
                    {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'مظهر المتجر' : 'Store Appearance'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'تخصيص مظهر متجرك' : 'Customize your store appearance'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{isRTL ? 'اللون الأساسي' : 'Primary Color'}</Label>
                  <div className="flex gap-3">
                    {['#00BFA5', '#2196F3', '#9C27B0', '#FF5722', '#4CAF50'].map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-lg border-2 border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>{isRTL ? 'شعار المتجر' : 'Store Logo'}</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <Store className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">{isRTL ? 'رفع شعار' : 'Upload Logo'}</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'صورة الغلاف' : 'Cover Image'}</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-full h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                      <Globe className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-2">{isRTL ? 'رفع صورة' : 'Upload Image'}</Button>
                </div>

                <div className="flex justify-end">
                  <Button>{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة تفضيلات الإشعارات' : 'Manage your notification preferences'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isRTL ? 'تحديثات الطلبات' : 'Order Updates'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تلقي إشعارات عند تحديث الطلبات' : 'Receive notifications when orders are updated'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, orderUpdates: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isRTL ? 'الرسائل الجديدة' : 'New Messages'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تلقي إشعارات عند وصول رسائل جديدة' : 'Receive notifications for new messages'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newMessages}
                    onCheckedChange={(checked) => setNotifications({...notifications, newMessages: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isRTL ? 'التسويق' : 'Marketing'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تلقي عروض وأخبار تسويقية' : 'Receive marketing offers and news'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{isRTL ? 'تنبيهات المنتجات' : 'Product Alerts'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تلقي تنبيهات عن المخزون والمنتجات' : 'Receive alerts about stock and products'}
                    </p>
                  </div>
                  <Switch
                    checked={notifications.productAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, productAlerts: checked})}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Settings */}
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إعدادات الشحن' : 'Shipping Settings'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة طرق الشحن والأسعار' : 'Manage shipping methods and pricing'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{isRTL ? 'رسوم الشحن الافتراضية' : 'Default Shipping Fee'}</Label>
                  <Input type="number" placeholder="50" />
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'الشحن المجاني عند' : 'Free Shipping Threshold'}</Label>
                  <Input type="number" placeholder="200" />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>{isRTL ? 'وقت التوصيل المتوقع' : 'Estimated Delivery Time'}</Label>
                  <Input placeholder={isRTL ? '3-5 أيام عمل' : '3-5 business days'} />
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'المناطق المدعومة' : 'Supported Regions'}</Label>
                  <Textarea
                    placeholder={isRTL ? 'الرياض، جدة، الدمام...' : 'Riyadh, Jeddah, Dammam...'}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button>{isRTL ? 'حفظ التغييرات' : 'Save Changes'}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
