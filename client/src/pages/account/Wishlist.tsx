import { useStore } from '@/lib/store';
import { useWishlist, useRemoveFromWishlist } from '@/hooks/use-wishlist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart, X } from 'lucide-react';

export default function AccountWishlist() {
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  const { data: wishlistItems, isLoading } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const handleRemove = async (productId: number) => {
    await removeFromWishlist.mutateAsync(productId);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container-width py-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{isRTL ? 'قائمة المفضلة' : 'My Wishlist'}</h1>
          <p className="text-muted-foreground mb-8">
            {isRTL ? 'المنتجات المحفوظة' : 'Your saved products'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'المنتجات المفضلة' : 'Favorite Products'}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-12 text-muted-foreground">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
            ) : !wishlistItems || wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  {isRTL ? 'لا توجد منتجات في المفضلة' : 'No products in wishlist'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map((item: any) => (
                  <Card key={item.id} className="border">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4" />
                      <h3 className="font-bold mb-2">{item.name}</h3>
                      <p className="text-lg font-bold text-primary mb-4">{item.price} {isRTL ? 'ر.س' : 'SAR'}</p>
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" className="flex-1">
                          <ShoppingCart className="me-2 h-4 w-4" />
                          {isRTL ? 'أضف للسلة' : 'Add to Cart'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleRemove(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
