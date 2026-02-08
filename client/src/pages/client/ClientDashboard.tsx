import { useTranslation } from 'react-i18next';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, User, MapPin, Heart, Settings } from 'lucide-react';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/mockData';

export default function ClientDashboard() {
  const { t } = useTranslation();
  const { locale } = useStore();
  const isRTL = locale === 'ar';

  // Mock client data
  const clientOrders = MOCK_ORDERS.slice(0, 3);
  const wishlist = MOCK_PRODUCTS.slice(0, 2);

  return (
    <div className="container-width py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('clientDashboard.title')}
        </h1>
        <p className="text-muted-foreground">
          {isRTL ? 'مرحباً بك في حسابك' : 'Welcome to your account'}
        </p>
      </div>

      <Tabs defaultValue="orders" className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="orders" className="gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">{t('clientDashboard.myOrders')}</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('clientDashboard.myProfile')}</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">{t('clientDashboard.myAddresses')}</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">{t('clientDashboard.myWishlist')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('clientDashboard.orderHistory')}</CardTitle>
              <CardDescription>
                {isRTL ? 'عرض وتتبع طلباتك' : 'View and track your orders'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">
                          {t('clientDashboard.orderNumber')}: #{order.id}
                        </span>
                        <Badge variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'shipped' ? 'secondary' :
                          'outline'
                        }>
                          {t(`sellerDashboard.${order.status}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('clientDashboard.orderDate')}: {order.date}
                      </p>
                      <p className="text-sm font-medium">
                        {t('clientDashboard.orderTotal')}: {order.total} {t('storefront.currency')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t('clientDashboard.trackOrder')}
                      </Button>
                      <Button variant="ghost" size="sm">
                        {t('common.view')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('clientDashboard.myProfile')}</CardTitle>
              <CardDescription>
                {isRTL ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('checkout.fullName')}</label>
                  <input
                    type="text"
                    defaultValue={isRTL ? 'أحمد محمد' : 'Ahmad Mohammad'}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('checkout.email')}</label>
                  <input
                    type="email"
                    defaultValue="ahmad@example.com"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('checkout.phone')}</label>
                  <input
                    type="tel"
                    defaultValue="+966 50 123 4567"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('checkout.city')}</label>
                  <input
                    type="text"
                    defaultValue={isRTL ? 'الرياض' : 'Riyadh'}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>{t('common.save')}</Button>
                <Button variant="outline">{t('common.cancel')}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('clientDashboard.changePassword')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isRTL ? 'كلمة المرور الحالية' : 'Current Password'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <Button>{t('common.save')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Addresses Tab */}
        <TabsContent value="addresses" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{t('clientDashboard.myAddresses')}</h2>
            <Button>
              <MapPin className="h-4 w-4 me-2" />
              {t('clientDashboard.addAddress')}
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Default Address */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{isRTL ? 'عنوان المنزل' : 'Home Address'}</CardTitle>
                  <Badge>{t('clientDashboard.defaultAddress')}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{isRTL ? 'أحمد محمد' : 'Ahmad Mohammad'}</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'شارع الملك فهد، الرياض 12345' : 'King Fahd Road, Riyadh 12345'}
                </p>
                <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">{t('common.edit')}</Button>
                  <Button variant="ghost" size="sm">{t('common.delete')}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Work Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{isRTL ? 'عنوان العمل' : 'Work Address'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">{isRTL ? 'أحمد محمد' : 'Ahmad Mohammad'}</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'شارع العليا، الرياض 11564' : 'Olaya Street, Riyadh 11564'}
                </p>
                <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">{t('clientDashboard.setAsDefault')}</Button>
                  <Button variant="outline" size="sm">{t('common.edit')}</Button>
                  <Button variant="ghost" size="sm">{t('common.delete')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('clientDashboard.myWishlist')}</CardTitle>
              <CardDescription>
                {isRTL ? 'المنتجات المفضلة لديك' : 'Your favorite products'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {wishlist.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={isRTL ? product.nameAr : product.nameEn}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">
                        {isRTL ? product.nameAr : product.nameEn}
                      </h3>
                      <p className="text-lg font-bold text-primary mb-3">
                        {product.price} {t('storefront.currency')}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          {t('storefront.addToCart')}
                        </Button>
                        <Button size="sm" variant="ghost">
                          {t('common.delete')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
