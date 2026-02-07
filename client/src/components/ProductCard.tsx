import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, addToCart } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: isRTL ? "تمت الإضافة للسلة" : "Added to Cart",
      description: isRTL ? `${product.nameAr} أضيف بنجاح` : `${product.nameEn} added successfully`,
      duration: 2000,
    });
  };

  const name = isRTL ? product.nameAr : product.nameEn;
  const description = isRTL ? product.descriptionAr : product.descriptionEn;

  return (
    <Link href={`/product/${product.id}`} className="block h-full group">
      <Card className="h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          <img 
            src={product.imageUrl} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.stock < 5 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              {isRTL ? 'كمية محدودة' : 'Low Stock'}
            </span>
          )}
        </div>
        <CardContent className="p-4">
          <div className="text-sm text-primary mb-1 font-medium">{product.category}</div>
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 h-10">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="font-bold text-xl">
            {product.price} <span className="text-sm font-normal text-muted-foreground">{product.currency}</span>
          </div>
          <Button 
            size="sm" 
            className="rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 me-2" />
            {isRTL ? 'إضافة' : 'Add'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
