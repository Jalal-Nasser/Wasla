import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/lib/store';
import { Link } from 'wouter';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Grid, List } from 'lucide-react';

export default function ProductListing() {
  const { t } = useTranslation();
  const { locale, addToCart } = useStore();
  const isRTL = locale === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'priceLowest') return a.price - b.price;
    if (sortBy === 'priceHighest') return b.price - a.price;
    return 0; // newest/popular
  });

  return (
    <div className="container-width py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('common.products')}</h1>
        <p className="text-muted-foreground">
          {isRTL ? 'تصفح منتجاتنا المتنوعة' : 'Browse our diverse products'}
        </p>
      </div>

      {/* Filters & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-sm font-medium">{t('categories.filterBy')}:</span>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              {t('categories.all')}
            </Button>
            {MOCK_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.nameEn ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.nameEn)}
              >
                {isRTL ? cat.nameAr : cat.nameEn}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">{t('categories.sortBy')}:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('categories.newest')}</SelectItem>
              <SelectItem value="popular">{t('categories.popular')}</SelectItem>
              <SelectItem value="priceLowest">{t('categories.priceLowest')}</SelectItem>
              <SelectItem value="priceHighest">{t('categories.priceHighest')}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 ms-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
      }>
        {filteredProducts.map((product) => (
          <Card key={product.id} className={viewMode === 'list' ? 'flex' : ''}>
            <Link href={`/product/${product.id}`} className={viewMode === 'list' ? 'flex w-full' : ''}>
              <div className={viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}>
                <img
                  src={product.imageUrl}
                  alt={isRTL ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
              <div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {isRTL ? product.nameAr : product.nameEn}
                </h3>
                {viewMode === 'list' && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {isRTL ? product.descriptionAr : product.descriptionEn}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">
                    {product.price} {t('storefront.currency')}
                  </span>
                  {product.stock > 0 ? (
                    <Badge variant="secondary" className="text-xs">
                      {t('storefront.inStock')}
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      {t('storefront.outOfStock')}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                className="w-full"
                disabled={product.stock === 0}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
              >
                {t('storefront.addToCart')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t('common.noData')}</p>
        </div>
      )}
    </div>
  );
}
