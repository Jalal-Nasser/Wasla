import { useProducts, useCategories } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ArrowRight, ArrowLeft, Star, ShoppingBag, Truck, CreditCard, CheckCircle2, TrendingUp, Zap, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { locale } = useStore();
  const isRTL = locale === 'ar';

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Salla.sa Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-blue-50 py-20 md:py-32">
        <div className="container-width relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-start"
            >
              {/* Trust Badge - Dark blue background for white text */}
              <div className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <span>{isRTL ? 'انضم لأكثر من 48,000 تاجر نشط في وصلة' : 'Join 48,000+ active merchants on Waslah'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {isRTL ? (
                  <>
                    وصلة.. <span className="text-primary">تجارة ذكيَّة</span>
                    <br />
                    وسهلة
                  </>
                ) : (
                  <>
                    Waslah.. <span className="text-primary">Smart Commerce</span>
                    <br />
                    Made Easy
                  </>
                )}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                {isRTL
                  ? 'أنشئ متجرك الإلكتروني في دقائق، واربط منتجاتك بمجموعة متكاملة من الحلول الرقميَّة الذكيَّة للمدفوعات، والشحن، وإدارة المخزون، والتسويق، بكل سهولة'
                  : 'Create your online store in minutes and connect your products to a complete set of smart digital solutions for payments, shipping, inventory management, and marketing with ease'}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-primary hover:bg-primary text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/40">
                    {isRTL ? 'أنشئ متجرك مجاناً' : 'Create Your Store Free'}
                    <ArrowIcon className="ms-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 text-lg px-8 py-6 rounded-full">
                  {isRTL ? 'تجربة المنصة' : 'Try the Platform'}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{isRTL ? 'مجاني تماماً' : '100% Free'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{isRTL ? 'بدون عمولة' : 'No Commission'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{isRTL ? 'دعم فني 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Dashboard Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Decorative Background */}
                <div className="absolute -top-10 -end-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-10 -start-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                {/* Dashboard Mockup */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 border">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  <div className="space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs text-primary mb-1">{isRTL ? 'المبيعات' : 'Sales'}</p>
                        <p className="text-2xl font-bold text-foreground">248,339</p>
                        <p className="text-xs text-primary">+12.5%</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs text-blue-700 mb-1">{isRTL ? 'الطلبات' : 'Orders'}</p>
                        <p className="text-2xl font-bold text-blue-900">16,543</p>
                        <p className="text-xs text-blue-600">+8.2%</p>
                      </div>
                    </div>

                    {/* Chart Simulation */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-4 rounded-lg">
                      <div className="flex items-end gap-1 h-24">
                        {[40, 70, 45, 85, 60, 95, 70, 80, 65, 90, 75, 100].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-primary rounded-t"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                            <div>
                              <div className="w-20 h-2 bg-gray-200 rounded mb-1"></div>
                              <div className="w-16 h-2 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          <div className="w-12 h-2 bg-blue-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Partner Logos */}
      <section className="py-12 bg-white border-y">
        <div className="container-width">
          <p className="text-center text-sm text-muted-foreground mb-8">
            {isRTL ? 'موثوق من قبل الشركات الرائدة' : 'Trusted by leading companies'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {['VISA', 'Mastercard', 'Mada', 'Apple Pay', 'STC Pay'].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-400">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'كل ما تحتاجه لإطلاق متجرك' : 'Everything you need to launch your store'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL
                ? 'حلول متكاملة لإدارة متجرك الإلكتروني بكفاءة'
                : 'Complete solutions to manage your online store efficiently'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: isRTL ? 'إطلاق سريع' : 'Quick Launch', desc: isRTL ? 'ابدأ البيع في دقائق' : 'Start selling in minutes', color: 'teal' },
              { icon: TrendingUp, title: isRTL ? 'أدوات تسويق' : 'Marketing Tools', desc: isRTL ? 'زيادة مبيعاتك بسهولة' : 'Boost your sales easily', color: 'blue' },
              { icon: Shield, title: isRTL ? 'آمن ومحمي' : 'Secure & Safe', desc: isRTL ? 'حماية كاملة لبياناتك' : 'Full data protection', color: 'green' },
              { icon: ShoppingBag, title: isRTL ? 'إدارة شاملة' : 'Complete Management', desc: isRTL ? 'تحكم كامل بمتجرك' : 'Full store control', color: 'orange' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="group p-6 rounded-2xl bg-white border hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{isRTL ? 'متاجر مميزة' : 'Featured Stores'}</h2>
              <p className="text-muted-foreground">{isRTL ? 'تسوق من أفضل المتاجر' : 'Shop from the best stores'}</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-blue-50">
                {isRTL ? 'عرض الكل' : 'View All'} <ArrowIcon className="ms-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
              : products?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1f79c2] text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'هل أنت مستعد للبدء؟' : 'Ready to get started?'}
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {isRTL
              ? 'انضم لآلاف التجار الذين يثقون في وصلة لإدارة متاجرهم الإلكترونية'
              : 'Join thousands of merchants who trust Waslah for managing their online stores'}
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-lg">
              {isRTL ? 'ابدأ مجاناً الآن' : 'Start Free Now'}
              <ArrowIcon className="ms-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

