import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
    const { locale } = useStore();
    const isRTL = locale === 'ar';
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    const plans = [
        {
            name: isRTL ? 'سلة بيسك' : 'Waslah Basic',
            nameEn: 'Waslah Basic',
            nameAr: 'سلة بيسك',
            price: isRTL ? 'مجانية' : 'Free',
            priceAmount: 0,
            description: isRTL ? 'للمبتدئين والراغبين بالتجربة' : 'For beginners and testing',
            icon: Sparkles,
            color: 'teal',
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-200',
            buttonClass: 'bg-primary hover:bg-primary',
            popular: false,
            features: [
                { text: isRTL ? 'عدد لا محدود من المنتجات' : 'Unlimited products', included: true },
                { text: isRTL ? 'عدد لا محدود من الطلبات' : 'Unlimited orders', included: true },
                { text: isRTL ? 'عدد لا محدود من العملاء' : 'Unlimited customers', included: true },
                { text: isRTL ? 'لوحة تحكم بسيطة' : 'Simple dashboard', included: true },
                { text: isRTL ? 'استبيانات المنتجات' : 'Product reviews', included: true },
                { text: isRTL ? 'تخصيصات محدودة' : 'Limited customizations', included: true },
                { text: isRTL ? '30+ ميزة أخرى' : '30+ other features', included: true },
                { text: isRTL ? 'تفضيل الدفع الإلكتروني' : 'Preferred payment methods', included: false },
                { text: isRTL ? 'شحن محلي وعالمي' : 'Local & international shipping', included: false },
                { text: isRTL ? 'تخصيص المتجر CSS و JS' : 'Custom CSS & JS', included: false },
            ]
        },
        {
            name: isRTL ? 'سلة بلس' : 'Waslah Plus',
            nameEn: 'Waslah Plus',
            nameAr: 'سلة بلس',
            price: '99',
            priceAmount: 99,
            currency: isRTL ? 'ر.س' : 'SAR',
            period: isRTL ? 'شهرياً' : '/month',
            description: isRTL ? 'للتجار الأفراد والأعمال المتوسطة' : 'For individual merchants and medium businesses',
            icon: Zap,
            color: 'blue',
            bgClass: 'bg-blue-50',
            borderClass: 'border-blue-200',
            buttonClass: 'bg-blue-600 hover:bg-blue-700',
            popular: false,
            features: [
                { text: isRTL ? 'كل مزايا سلة بيسك + المزايا التالية:' : 'All Basic features + the following:', included: true, bold: true },
                { text: isRTL ? 'تفضيل الدفع الإلكتروني (مدى، أبل باي، ...)' : 'Preferred payments (Mada, Apple Pay, ...)', included: true },
                { text: isRTL ? 'شحن محلي وعالمي' : 'Local & international shipping', included: true },
                { text: isRTL ? 'حجز دومين (نطاق) خاص بمتجرك' : 'Custom domain for your store', included: true },
                { text: isRTL ? 'إضافة كل أنواع المنتجات' : 'Add all product types', included: true },
                { text: isRTL ? 'بيع في قنوات بيع متعددة' : 'Sell on multiple channels', included: true },
                { text: isRTL ? 'مع تطبيق سلة بوكة مجاناً' : 'With Salla POS app free', included: true },
                { text: isRTL ? '30+ ميزة أخرى' : '30+ other features', included: true },
                { text: isRTL ? 'تخصيص المتجر CSS و JS' : 'Custom CSS & JS', included: false },
                { text: isRTL ? 'ربط خدمات محاسبية' : 'Accounting integrations', included: false },
            ]
        },
        {
            name: isRTL ? 'سلة برو' : 'Waslah Pro',
            nameEn: 'Waslah Pro',
            nameAr: 'سلة برو',
            price: '299',
            priceAmount: 299,
            currency: isRTL ? 'ر.س' : 'SAR',
            period: isRTL ? 'شهرياً' : '/month',
            description: isRTL ? 'الأفضل للشركات والمؤسسات' : 'Best for companies and enterprises',
            icon: Crown,
            color: 'orange',
            bgClass: 'bg-gradient-to-br from-orange-50 to-amber-50',
            borderClass: 'border-orange-300',
            buttonClass: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700',
            popular: true,
            features: [
                { text: isRTL ? 'كل مزايا سلة بلس + المزايا التالية:' : 'All Plus features + the following:', included: true, bold: true },
                { text: isRTL ? 'تفعيل قيمة الضريبة المضافة' : 'Enable VAT', included: true },
                { text: isRTL ? 'تخصيص تصميم المتجر عبر CSS و  JS' : 'Custom store design via CSS & JS', included: true },
                { text: isRTL ? 'تسويق واسع مع قنوات مختلفة' : 'Extensive marketing channels', included: true },
                { text: isRTL ? 'إضافة حسابات الموظفين وإدارتها' : 'Add & manage employee accounts', included: true },
                { text: isRTL ? 'ربط خدمات محاسبية ومالية متكاملة' : 'Full accounting & finance integrations', included: true },
                { text: isRTL ? '50+ ميزة أخرى' : '50+ other features', included: true },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-background to-blue-50">
                <div className="container-width text-center">
                    <div className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span>{isRTL ? 'خطط مرنة لكل نشاط تجاري' : 'Flexible plans for every business'}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                        {isRTL ? (
                            <>
                                اختر الباقة <span className="text-primary">المناسبة</span>
                                <br />
                                لنشاطك التجاري
                            </>
                        ) : (
                            <>
                                Choose the <span className="text-primary">Right Plan</span>
                                <br />
                                for Your Business
                            </>
                        )}
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        {isRTL
                            ? 'ابدأ مجاناً وقم بالترقية في أي وقت. جميع الباقات تشمل الدعم الفني على مدار الساعة'
                            : 'Start free and upgrade anytime. All plans include 24/7 technical support'}
                    </p>

                    {/* Pricing Toggle - Monthly/Yearly */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="text-sm font-medium text-muted-foreground">{isRTL ? 'سنوي' : 'Yearly'}</span>
                        <div className="relative inline-flex h-7 w-14 items-center rounded-full bg-primary">
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium px-2">
                                {isRTL ? 'شهري' : 'Monthly'}
                            </div>
                        </div>
                        <span className="text-sm font-medium">{isRTL ? 'شهري' : 'Monthly'}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {isRTL ? 'وفر 20%' : 'Save 20%'}
                        </span>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 -mt-32">
                <div className="container-width">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => {
                            const Icon = plan.icon;
                            const isProPlan = plan.popular;

                            return (
                                <div
                                    key={index}
                                    className={`relative rounded-2xl border-2 ${plan.borderClass} bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ${isProPlan ? 'scale-105 ring-2 ring-orange-400' : ''
                                        }`}
                                >
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute -top-4 start-1/2 -translate-x-1/2">
                                            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                                                <Sparkles className="h-4 w-4" />
                                                {isRTL ? 'الأكثر شيوعاً' : 'Most Popular'}
                                            </div>
                                        </div>
                                    )}

                                    <div className={`p-8 rounded-t-2xl ${plan.bgClass}`}>
                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center mb-4 text-${plan.color}-600`}>
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        {/* Plan Name */}
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                                        {/* Price */}
                                        <div className="mb-6">
                                            {plan.priceAmount === 0 ? (
                                                <div className="text-4xl font-extrabold text-primary">{plan.price}</div>
                                            ) : (
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                                    <div className="flex flex-col">
                                                        <span className="text-lg font-medium text-muted-foreground">{plan.currency}</span>
                                                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <Link href="/auth/register">
                                            <Button className={`w-full ${plan.buttonClass} text-white py-6 rounded-xl text-lg font-semibold shadow-lg`}>
                                                {isRTL ? `اختر ${plan.nameAr}` : `Choose ${plan.nameEn}`}
                                                <ArrowIcon className="ms-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Features List */}
                                    <div className="p-8">
                                        <ul className="space-y-4">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    {feature.included ? (
                                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                                            <Check className="h-3 w-3 text-primary" />
                                                        </div>
                                                    ) : (
                                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5">
                                                            <span className="text-gray-400 text-xs">✕</span>
                                                        </div>
                                                    )}
                                                    <span className={`text-sm ${feature.bold ? 'font-bold' : ''} ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Comparison Table Link */}
            <section className="py-12 bg-gray-50 border-y">
                <div className="container-width text-center">
                    <h3 className="text-xl font-bold mb-4">
                        {isRTL ? 'هل تريد مقارنة تفصيلية بين الباقات؟' : 'Want a detailed comparison of plans?'}
                    </h3>
                    <Button variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50">
                        {isRTL ? 'مقارنة الباقات' : 'Compare Plans'}
                        <ArrowIcon className="ms-2 h-4 w-4" />
                    </Button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
                <div className="container-width max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: isRTL ? 'هل يمكنني البدء مجاناً؟' : 'Can I start for free?',
                                a: isRTL
                                    ? 'نعم! باقة سلة بيسك مجانية تماماً وتتضمن كل الميزات الأساسية لإطلاق متجرك الإلكتروني.'
                                    : 'Yes! Waslah Basic is completely free and includes all essential features to launch your online store.'
                            },
                            {
                                q: isRTL ? 'هل يمكنني الترقية أو التخفيض في أي وقت؟' : 'Can I upgrade or downgrade anytime?',
                                a: isRTL
                                    ? 'بالتأكيد! يمكنك تغيير باقتك في أي وقت من لوحة التحكم وسيتم احتساب الفرق بشكل تلقائي.'
                                    : 'Absolutely! You can change your plan anytime from your dashboard and the difference will be calculated automatically.'
                            },
                            {
                                q: isRTL ? 'ما هي وسائل الدفع المتاحة؟' : 'What payment methods are available?',
                                a: isRTL
                                    ? 'نقبل جميع البطاقات الائتمانية (فيزا، ماستركارد، مدى) وأبل باي و STC Pay.'
                                    : 'We accept all credit cards (Visa, Mastercard, Mada), Apple Pay, and STC Pay.'
                            },
                            {
                                q: isRTL ? 'هل هناك عمولة على المبيعات؟' : 'Is there a commission on sales?',
                                a: isRTL
                                    ? 'لا! جميع الباقات بدون أي عمولة على المبيعات. تدفع فقط رسوم الباقة الشهرية.'
                                    : 'No! All plans have no commission on sales. You only pay the monthly subscription fee.'
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
                <div className="container-width text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {isRTL ? 'جاهز للبدء؟' : 'Ready to get started?'}
                    </h2>
                    <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        {isRTL
                            ? 'ابدأ مجاناً اليوم ولا حاجة لبطاقة ائتمانية'
                            : 'Start free today with no credit card required'}
                    </p>
                    <Link href="/auth/register">
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-lg">
                            {isRTL ? 'أنشئ متجرك الآن' : 'Create Your Store Now'}
                            <ArrowIcon className="ms-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

