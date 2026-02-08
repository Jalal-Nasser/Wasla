import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Chrome, User, Store } from 'lucide-react';

export default function Register() {
  const { locale } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match',
      });
      return;
    }

    if (!agreed) {
      toast({
        variant: 'destructive',
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يجب الموافقة على الشروط والأحكام' : 'You must agree to terms and conditions',
      });
      return;
    }

    toast({
      title: isRTL ? 'تم إنشاء الحساب بنجاح' : 'Account Created Successfully',
      description: isRTL ? 'مرحباً بك في وصلة' : 'Welcome to Waslah',
    });
    setLocation('/dashboard/seller');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg">
              W
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            {isRTL ? 'إنشاء حساب جديد' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-base">
            {isRTL ? 'ابدأ رحلتك في التجارة الإلكترونية' : 'Start your e-commerce journey'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{isRTL ? 'الاسم الكامل' : 'Full Name'}</Label>
              <div className="relative">
                <User className="absolute start-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className="ps-10 h-11"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className="ps-10 h-11"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">{isRTL ? 'اسم المتجر' : 'Store Name'}</Label>
              <div className="relative">
                <Store className="absolute start-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="storeName"
                  type="text"
                  placeholder={isRTL ? 'أدخل اسم متجرك' : 'Enter your store name'}
                  className="ps-10 h-11"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                  className="ps-10 pe-10 h-11"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute end-1 top-1 h-9 w-9"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}</Label>
              <div className="relative">
                <Lock className="absolute start-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
                  className="ps-10 h-11"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                {isRTL ? 'أوافق على ' : 'I agree to '}
                <Link href="/terms">
                  <span className="text-primary hover:underline">
                    {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
                  </span>
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold rounded-lg">
              {isRTL ? 'إنشاء حساب' : 'Create Account'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {isRTL ? 'أو' : 'Or'}
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-11" type="button">
            <Chrome className="me-2 h-5 w-5" />
            {isRTL ? 'التسجيل بواسطة جوجل' : 'Sign up with Google'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isRTL ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
            </span>
            <Link href="/auth/login">
              <Button variant="link" className="px-0 h-auto font-semibold text-primary">
                {isRTL ? 'تسجيل الدخول' : 'Sign in'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
