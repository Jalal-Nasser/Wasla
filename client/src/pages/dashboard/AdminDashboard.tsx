import { useStore } from "@/lib/store";
import { DashboardLayout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenants } from "@/hooks/use-tenants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreVertical } from "lucide-react";

export default function AdminDashboard() {
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  const { data: tenants, isLoading } = useTenants();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8 animate-in-up">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{isRTL ? 'إدارة المتاجر' : 'Store Management'}</h1>
          <Button>{isRTL ? 'إضافة متجر' : 'Add Store'}</Button>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>{isRTL ? 'جميع المتاجر' : 'All Stores'}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-right">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-start align-middle font-medium text-muted-foreground">{isRTL ? 'اسم المتجر' : 'Store Name'}</th>
                      <th className="h-12 px-4 text-start align-middle font-medium text-muted-foreground">{isRTL ? 'النطاق' : 'Domain'}</th>
                      <th className="h-12 px-4 text-start align-middle font-medium text-muted-foreground">{isRTL ? 'الباقة' : 'Plan'}</th>
                      <th className="h-12 px-4 text-start align-middle font-medium text-muted-foreground">{isRTL ? 'الحالة' : 'Status'}</th>
                      <th className="h-12 px-4 text-end align-middle font-medium text-muted-foreground">{isRTL ? 'إجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {tenants?.map((tenant) => (
                      <tr key={tenant.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle font-medium">{tenant.name}</td>
                        <td className="p-4 align-middle font-mono text-xs text-muted-foreground">{tenant.domain}</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className="capitalize">{tenant.plan}</Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 shadow-none border-none">
                            {tenant.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-end">
                           <Button variant="ghost" size="icon">
                             <ExternalLink className="h-4 w-4" />
                           </Button>
                           <Button variant="ghost" size="icon">
                             <MoreVertical className="h-4 w-4" />
                           </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
