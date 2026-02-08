import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
    useAddresses,
    useCreateAddress,
    useUpdateAddress,
    useDeleteAddress,
    useSetDefaultAddress,
} from '@/hooks/use-addresses';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User, MapPin, Phone, CreditCard, Heart, Plus, Edit, Trash2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AccountAddresses() {
    const { locale } = useStore();
    const { toast } = useToast();
    const isRTL = locale === 'ar';

    const { data: addresses, isLoading } = useAddresses();
    const createAddress = useCreateAddress();
    const updateAddress = useUpdateAddress();
    const deleteAddress = useDeleteAddress();
    const setDefaultAddress = useSetDefaultAddress();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<any>(null);
    const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: '',
        district: '',
        street: '',
        buildingNumber: '',
        postalCode: '',
    });

    const profile = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        avatar: '',
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            city: '',
            district: '',
            street: '',
            buildingNumber: '',
            postalCode: '',
        });
        setEditingAddress(null);
    };

    const handleOpenAddDialog = () => {
        resetForm();
        setIsAddDialogOpen(true);
    };

    const handleOpenEditDialog = (address: any) => {
        setFormData({
            fullName: address.fullName,
            phone: address.phone,
            city: address.city,
            district: address.district,
            street: address.street,
            buildingNumber: address.buildingNumber || '',
            postalCode: address.postalCode || '',
        });
        setEditingAddress(address);
        setIsAddDialogOpen(true);
    };

    const handleSaveAddress = async () => {
        if (!formData.fullName || !formData.phone || !formData.city || !formData.street) {
            toast({
                title: isRTL ? 'خطأ' : 'Error',
                description: isRTL ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
                variant: 'destructive',
            });
            return;
        }

        if (editingAddress) {
            await updateAddress.mutateAsync({ id: editingAddress.id, data: formData });
            toast({
                title: isRTL ? 'تم التحديث' : 'Updated',
                description: isRTL ? 'تم تحديث العنوان بنجاح' : 'Address updated successfully',
            });
        } else {
            await createAddress.mutateAsync(formData);
            toast({
                title: isRTL ? 'تمت الإضافة' : 'Added',
                description: isRTL ? 'تمت إضافة العنوان بنجاح' : 'Address added successfully',
            });
        }

        setIsAddDialogOpen(false);
        resetForm();
    };

    const handleDeleteAddress = async () => {
        if (!deletingAddressId) return;
        await deleteAddress.mutateAsync(deletingAddressId);
        toast({
            title: isRTL ? 'تم الحذف' : 'Deleted',
            description: isRTL ? 'تم حذف العنوان بنجاح' : 'Address deleted successfully',
        });
        setDeletingAddressId(null);
    };

    const handleSetDefault = async (id: number) => {
        await setDefaultAddress.mutateAsync(id);
        toast({
            title: isRTL ? 'تم التحديث' : 'Updated',
            description: isRTL ? 'تم تعيين العنوان الافتراضي' : 'Default address set',
        });
    };

    return (
        <div className="min-h-screen bg-muted/20">
            <div className="container-width py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <aside className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={profile.avatar} />
                                        <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                                            {profile.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-xl font-bold">{profile.name}</h2>
                                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        {isRTL ? 'تحميل صورة' : 'Upload Photo'}
                                    </Button>
                                </div>

                                <Separator className="my-6" />

                                <nav className="space-y-2">
                                    <Link href="/account/profile">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <User className="me-2 h-4 w-4" />
                                            {isRTL ? 'الملف الشخصي' : 'Profile'}
                                        </Button>
                                    </Link>
                                    <Link href="/account/orders">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <CreditCard className="me-2 h-4 w-4" />
                                            {isRTL ? 'طلباتي' : 'My Orders'}
                                        </Button>
                                    </Link>
                                    <Link href="/account/addresses">
                                        <Button variant="default" className="w-full justify-start">
                                            <MapPin className="me-2 h-4 w-4" />
                                            {isRTL ? 'العناوين' : 'Addresses'}
                                        </Button>
                                    </Link>
                                    <Link href="/account/wishlist">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Heart className="me-2 h-4 w-4" />
                                            {isRTL ? 'المفضلة' : 'Wishlist'}
                                        </Button>
                                    </Link>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{isRTL ? 'عناويني' : 'My Addresses'}</CardTitle>
                                        <CardDescription>
                                            {isRTL ? 'إدارة عناوين الشحن والفواتير' : 'Manage your shipping and billing addresses'}
                                        </CardDescription>
                                    </div>
                                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button onClick={handleOpenAddDialog}>
                                                <Plus className="me-2 h-4 w-4" />
                                                {isRTL ? 'إضافة عنوان' : 'Add Address'}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {editingAddress
                                                        ? isRTL
                                                            ? 'تعديل العنوان'
                                                            : 'Edit Address'
                                                        : isRTL
                                                            ? 'إضافة عنوان جديد'
                                                            : 'Add New Address'}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {isRTL
                                                        ? 'أدخل تفاصيل عنوان الشحن أو الفواتير'
                                                        : 'Enter your shipping or billing address details'}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName">
                                                        {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                                                    </Label>
                                                    <Input
                                                        id="fullName"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                        placeholder={isRTL ? 'أحمد محمد العلي' : 'John Doe'}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">
                                                        {isRTL ? 'رقم الهاتف' : 'Phone Number'} *
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="+966 50 123 4567"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="city">
                                                        {isRTL ? 'المدينة' : 'City'} *
                                                    </Label>
                                                    <Input
                                                        id="city"
                                                        value={formData.city}
                                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                        placeholder={isRTL ? 'الرياض' : 'Riyadh'}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="district">
                                                        {isRTL ? 'الحي' : 'District'}
                                                    </Label>
                                                    <Input
                                                        id="district"
                                                        value={formData.district}
                                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                                        placeholder={isRTL ? 'حي السليمانية' : 'Al Sulimaniyah'}
                                                    />
                                                </div>

                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="street">
                                                        {isRTL ? 'اسم الشارع' : 'Street Name'} *
                                                    </Label>
                                                    <Input
                                                        id="street"
                                                        value={formData.street}
                                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                                        placeholder={isRTL ? 'شارع الملك فهد' : 'King Fahd Street'}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="buildingNumber">
                                                        {isRTL ? 'رقم المبنى' : 'Building Number'}
                                                    </Label>
                                                    <Input
                                                        id="buildingNumber"
                                                        value={formData.buildingNumber}
                                                        onChange={(e) => setFormData({ ...formData, buildingNumber: e.target.value })}
                                                        placeholder="1234"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="postalCode">
                                                        {isRTL ? 'الرمز البريدي' : 'Postal Code'}
                                                    </Label>
                                                    <Input
                                                        id="postalCode"
                                                        value={formData.postalCode}
                                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                                        placeholder="12345"
                                                    />
                                                </div>
                                            </div>

                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                                    {isRTL ? 'إلغاء' : 'Cancel'}
                                                </Button>
                                                <Button onClick={handleSaveAddress} disabled={createAddress.isPending || updateAddress.isPending}>
                                                    {isRTL ? 'حفظ' : 'Save'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">{isRTL ? 'جاري التحميل...' : 'Loading...'}</p>
                                    </div>
                                ) : !addresses || addresses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-lg text-muted-foreground mb-4">
                                            {isRTL ? 'لا توجد عناوين محفوظة' : 'No saved addresses'}
                                        </p>
                                        <Button onClick={handleOpenAddDialog}>
                                            <Plus className="me-2 h-4 w-4" />
                                            {isRTL ? 'إضافة عنوان جديد' : 'Add New Address'}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {addresses.map((address: any) => (
                                            <Card key={address.id} className="border-2 hover:border-primary/50 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className="font-bold text-lg">{address.fullName}</h3>
                                                                {address.isDefault && (
                                                                    <Badge variant="default" className="gap-1">
                                                                        <Star className="h-3 w-3" />
                                                                        {isRTL ? 'افتراضي' : 'Default'}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="space-y-1 text-sm text-muted-foreground">
                                                                <p className="flex items-center gap-2">
                                                                    <Phone className="h-3 w-3" />
                                                                    {address.phone}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <MapPin className="h-3 w-3" />
                                                                    {address.street}, {address.district}
                                                                </p>
                                                                <p className="ps-5">
                                                                    {address.city}
                                                                    {address.postalCode && ` - ${address.postalCode}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Separator className="my-4" />

                                                    <div className="flex items-center gap-2">
                                                        {!address.isDefault && (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1"
                                                                onClick={() => handleSetDefault(address.id)}
                                                            >
                                                                <Star className="me-2 h-3 w-3" />
                                                                {isRTL ? 'جعله افتراضي' : 'Set as Default'}
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1"
                                                            onClick={() => handleOpenEditDialog(address)}
                                                        >
                                                            <Edit className="me-2 h-3 w-3" />
                                                            {isRTL ? 'تعديل' : 'Edit'}
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setDeletingAddressId(address.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
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
            </div>

            <AlertDialog open={deletingAddressId !== null} onOpenChange={() => setDeletingAddressId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{isRTL ? 'تأكيد الحذف' : 'Confirm Deletion'}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {isRTL
                                ? 'هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.'
                                : 'Are you sure you want to delete this address? This action cannot be undone.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{isRTL ? 'إلغاء' : 'Cancel'}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAddress}>
                            {isRTL ? 'حذف' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
