import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

export default function Login() {
  const { locale } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would call an API
    toast({
      title: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
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
            {isRTL ? 'تسجيل الدخول' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-base">
            {isRTL ? 'سجل دخولك لإدارة متجرك' : 'Sign in to manage your store'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                <Link href="/auth/forgot-password">
                  <Button variant="link" className="px-0 h-auto text-xs text-primary">
                    {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </Button>
                </Link>
              </div>
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

            <Button type="submit" className="w-full h-11 text-base font-semibold rounded-lg">
              {isRTL ? 'تسجيل الدخول' : 'Sign In'}
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
            {isRTL ? 'تسجيل الدخول بواسطة جوجل' : 'Continue with Google'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isRTL ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
            </span>
            <Link href="/auth/register">
              <Button variant="link" className="px-0 h-auto font-semibold text-primary">
                {isRTL ? 'إنشاء حساب جديد' : 'Create account'}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
