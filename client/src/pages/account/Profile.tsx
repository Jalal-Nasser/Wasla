import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Lock, Bell, CreditCard, Heart } from 'lucide-react';

export default function AccountProfile() {
  const { locale } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const [profile, setProfile] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    avatar: '',
  });

  const handleSave = () => {
    toast({
      title: isRTL ? 'تم الحفظ' : 'Saved',
      description: isRTL ? 'تم حفظ معلومات الحساب بنجاح' : 'Account information saved successfully',
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container-width py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    {isRTL ? 'تحميل صورة' : 'Upload Photo'}
                  </Button>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Link href="/account/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="me-2 h-4 w-4" />
                      {isRTL ? 'الملف الشخصي' : 'Profile'}
                    </Button>
                  </Link>
                  <Link href="/account/orders">
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="me-2 h-4 w-4" />
                      {isRTL ? 'طلباتي' : 'My Orders'}
                    </Button>
                  </Link>
                  <Link href="/account/addresses">
                    <Button variant="ghost" className="w-full justify-start">
                      <MapPin className="me-2 h-4 w-4" />
                      {isRTL ? 'العناوين' : 'Addresses'}
                    </Button>
                  </Link>
                  <Link href="/account/wishlist">
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="me-2 h-4 w-4" />
                      {isRTL ? 'المفضلة' : 'Wishlist'}
                    </Button>
                  </Link>
                  <Link href="/account/wallet">
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="me-2 h-4 w-4" />
                      {isRTL ? 'المحفظة' : 'Wallet'}
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'معلومات الحساب' : 'Account Information'}</CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">
                      <User className="h-4 w-4 me-2" />
                      {isRTL ? 'شخصي' : 'Personal'}
                    </TabsTrigger>
                    <TabsTrigger value="security">
                      <Lock className="h-4 w-4 me-2" />
                      {isRTL ? 'الأمان' : 'Security'}
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                      <Bell className="h-4 w-4 me-2" />
                      {isRTL ? 'الإشعارات' : 'Notifications'}
                    </TabsTrigger>
                  </TabsList>

                  {/* Personal Information Tab */}
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
                        <div className="relative">
                          <User className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="ps-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                        <div className="relative">
                          <Mail className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="ps-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                        <div className="relative">
                          <Phone className="absolute start-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="ps-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSave}>
                        {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">{isRTL ? 'كلمة المرور الحالية' : 'Current Password'}</Label>
                        <Input id="current-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">{isRTL ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                        <Input id="new-password" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button>{isRTL ? 'تحديث كلمة المرور' : 'Update Password'}</Button>
                    </div>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="space-y-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {isRTL
                          ? 'إدارة تفضيلات الإشعارات الخاصة بك'
                          : 'Manage your notification preferences'}
                      </p>
                      {/* Add notification switches here similar to seller settings */}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
