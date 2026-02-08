import { useState } from 'react';
import { useStore } from '@/lib/store';
import { DashboardLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Eye, ImagePlus } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export default function SellerProducts() {
  const { locale } = useStore();
  const { toast } = useToast();
  const isRTL = locale === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const [newProduct, setNewProduct] = useState({
    nameEn: '',
    nameAr: '',
    descriptionEn: '',
    descriptionAr: '',
    price: '',
    stock: '',
    category: '',
    imageUrl: '',
  });

  const handleAddProduct = () => {
    toast({
      title: isRTL ? 'تم إضافة المنتج' : 'Product Added',
      description: isRTL ? 'تمت إضافة المنتج بنجاح' : 'Product added successfully',
    });
    setIsAddDialogOpen(false);
    setNewProduct({
      nameEn: '',
      nameAr: '',
      descriptionEn: '',
      descriptionAr: '',
      price: '',
      stock: '',
      category: '',
      imageUrl: '',
    });
  };

  const filteredProducts = products.filter(p => 
    p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nameAr.includes(searchQuery)
  );

  return (
    <DashboardLayout type="seller">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isRTL ? 'المنتجات' : 'Products'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isRTL ? 'إدارة منتجات متجرك' : 'Manage your store products'}
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-lg">
                <Plus className="me-2 h-4 w-4" />
                {isRTL ? 'إضافة منتج' : 'Add Product'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isRTL ? 'إضافة منتج جديد' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {isRTL ? 'أضف منتجاً جديداً إلى متجرك' : 'Add a new product to your store'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)'}</Label>
                    <Input
                      value={newProduct.nameEn}
                      onChange={(e) => setNewProduct({...newProduct, nameEn: e.target.value})}
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)'}</Label>
                    <Input
                      value={newProduct.nameAr}
                      onChange={(e) => setNewProduct({...newProduct, nameAr: e.target.value})}
                      placeholder="اسم المنتج"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الوصف (إنجليزي)' : 'Description (English)'}</Label>
                    <Textarea
                      value={newProduct.descriptionEn}
                      onChange={(e) => setNewProduct({...newProduct, descriptionEn: e.target.value})}
                      placeholder="Product description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الوصف (عربي)' : 'Description (Arabic)'}</Label>
                    <Textarea
                      value={newProduct.descriptionAr}
                      onChange={(e) => setNewProduct({...newProduct, descriptionAr: e.target.value})}
                      placeholder="وصف المنتج"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{isRTL ? 'السعر' : 'Price'}</Label>
                    <Input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="199.99"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'المخزون' : 'Stock'}</Label>
                    <Input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isRTL ? 'الفئة' : 'Category'}</Label>
                    <Input
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      placeholder="Electronics"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{isRTL ? 'رابط الصورة' : 'Image URL'}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="icon">
                      <ImagePlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button onClick={handleAddProduct}>
                    {isRTL ? 'إضافة' : 'Add Product'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'ابحث عن منتج...' : 'Search products...'}
                  className="ps-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">{isRTL ? 'الصورة' : 'Image'}</TableHead>
                    <TableHead>{isRTL ? 'المنتج' : 'Product'}</TableHead>
                    <TableHead>{isRTL ? 'الفئة' : 'Category'}</TableHead>
                    <TableHead>{isRTL ? 'السعر' : 'Price'}</TableHead>
                    <TableHead>{isRTL ? 'المخزون' : 'Stock'}</TableHead>
                    <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead className="text-center">{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {isRTL ? product.nameAr : product.nameEn}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="font-semibold">
                        {product.price} {product.currency}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        {product.stock > 0 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {isRTL ? 'متوفر' : 'In Stock'}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            {isRTL ? 'نفذ' : 'Out of Stock'}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
