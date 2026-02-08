import { useState } from 'react';
import { Link } from 'wouter';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const { locale } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset - in real app, this would call an API
    setSent(true);
    toast({
      title: isRTL ? 'تم الإرسال' : 'Email Sent',
      description: isRTL ? 'تحقق من بريدك الإلكتروني' : 'Check your email for reset instructions',
    });
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">
              {isRTL ? 'تحقق من بريدك الإلكتروني' : 'Check Your Email'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isRTL 
                ? 'لقد أرسلنا تعليمات إعادة تعيين كلمة المرور إلى' 
                : 'We sent password reset instructions to'} 
              <br />
              <span className="font-semibold text-foreground">{email}</span>
            </p>
            <Link href="/auth/login">
              <Button className="w-full rounded-lg h-11">
                <ArrowIcon className="me-2 h-4 w-4" />
                {isRTL ? 'العودة لتسجيل الدخول' : 'Back to Login'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
          </CardTitle>
          <CardDescription className="text-base">
            {isRTL 
              ? 'لا تقلق، سنرسل لك تعليمات إعادة التعيين' 
              : "No worries, we'll send you reset instructions"}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold rounded-lg">
              {isRTL ? 'إرسال تعليمات إعادة التعيين' : 'Send Reset Instructions'}
            </Button>
          </form>

          <Link href="/auth/login">
            <Button variant="ghost" className="w-full">
              <ArrowIcon className="me-2 h-4 w-4" />
              {isRTL ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
