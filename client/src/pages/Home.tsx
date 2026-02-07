import { useProducts, useCategories } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ArrowRight, ArrowLeft, Star, ShoppingBag, Truck, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container-width relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-start"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                {isRTL ? 'تسوق بذكاء،' : 'Shop Smart,'} <br/>
                <span className="text-primary">{isRTL ? 'بكل سهولة وأمان' : 'Easy & Secure'}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
                {isRTL 
                  ? 'اكتشف آلاف المنتجات المميزة من أفضل الماركات العالمية والمحلية بأسعار تنافسية.'
                  : 'Discover thousands of unique products from top global and local brands at competitive prices.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full text-lg px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30">
                  {isRTL ? 'تسوق الآن' : 'Shop Now'}
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 border-2">
                  {isRTL ? 'تصفح العروض' : 'View Offers'}
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                {/* Shopping illustration from Unsplash */}
                {/* Woman holding shopping bags looking happy */}
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                  alt="Shopping"
                  className="relative z-10 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 object-cover w-full h-full border-4 border-background"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShoppingBag, titleAr: 'منتجات أصلية', titleEn: 'Original Products', descAr: 'ضمان الجودة 100%', descEn: '100% Quality Guarantee' },
              { icon: Truck, titleAr: 'شحن سريع', titleEn: 'Fast Shipping', descAr: 'توصيل لباب منزلك', descEn: 'Doorstep Delivery' },
              { icon: CreditCard, titleAr: 'دفع آمن', titleEn: 'Secure Payment', descAr: 'وسائل دفع متعددة', descEn: 'Multiple Payment Methods' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{isRTL ? feature.titleAr : feature.titleEn}</h3>
                  <p className="text-muted-foreground">{isRTL ? feature.descAr : feature.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container-width">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{isRTL ? 'الأقسام المميزة' : 'Featured Categories'}</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              {isRTL ? 'عرض الكل' : 'View All'} <ArrowIcon className="ms-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoriesLoading 
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
              : categories?.map((cat) => (
                <div key={cat.id} className="group cursor-pointer">
                  <div className="bg-card border hover:border-primary/50 transition-all rounded-xl p-6 flex flex-col items-center justify-center gap-3 aspect-[4/3] shadow-sm hover:shadow-md">
                    {/* Placeholder icons since lucide names are strings in mock data */}
                    <div className="p-3 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {isRTL ? cat.nameAr : cat.nameEn}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{isRTL ? 'وصل حديثاً' : 'New Arrivals'}</h2>
              <p className="text-muted-foreground">{isRTL ? 'تسوق أحدث المنتجات المضافة للمتجر' : 'Shop the latest products added to the store'}</p>
            </div>
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
              : products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
          
          <div className="mt-12 text-center">
             <Button variant="outline" size="lg" className="rounded-full min-w-[200px]">
               {isRTL ? 'تحميل المزيد' : 'Load More'}
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
