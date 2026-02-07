import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading, error } = useProduct(id);
  const { locale, addToCart } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="container-width py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-center py-20 text-muted-foreground">Product Not Found</div>;
  }

  const name = isRTL ? product.nameAr : product.nameEn;
  const description = isRTL ? product.descriptionAr : product.descriptionEn;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: isRTL ? "تمت الإضافة للسلة" : "Added to Cart",
      description: isRTL ? `${name} أضيف بنجاح` : `${name} added successfully`,
    });
  };

  return (
    <div className="container-width py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-3xl overflow-hidden border">
             <img 
               src={product.imageUrl} 
               alt={name}
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
             />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-colors ${i === activeImage ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(i)}
              >
                <img 
                  src={product.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-primary bg-primary/10">
                {product.category}
              </Badge>
              {product.stock > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                   {isRTL ? 'متوفر' : 'In Stock'}
                </Badge>
              ) : (
                <Badge variant="destructive">
                   {isRTL ? 'نفذت الكمية' : 'Out of Stock'}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{name}</h1>
            <div className="flex items-end gap-2 text-primary font-bold">
              <span className="text-4xl">{product.price}</span>
              <span className="text-xl mb-1 text-muted-foreground">{product.currency}</span>
            </div>
          </div>

          <Separator />

          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-1 rounded-full text-lg h-14" onClick={handleAddToCart}>
                <ShoppingCart className="me-2" />
                {isRTL ? 'إضافة للسلة' : 'Add to Cart'}
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-2">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-muted-foreground">
              <Share2 className="me-2 h-4 w-4" />
              {isRTL ? 'مشاركة المنتج' : 'Share Product'}
            </Button>
          </div>

          <div className="bg-muted/50 p-6 rounded-2xl space-y-3 border">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
              <span>{isRTL ? 'ضمان استرجاع لمدة 30 يوم' : '30 Days Money Back Guarantee'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Check className="h-4 w-4" />
              </div>
              <span>{isRTL ? 'شحن مجاني للطلبات فوق 200 ريال' : 'Free Shipping on orders over 200 SAR'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
