import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useWalletBalance, useWalletTransactions } from '@/hooks/use-wallet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AccountWallet() {
  const { locale } = useStore();
  const isRTL = locale === 'ar';
  const { data: balance } = useWalletBalance();
  const { data: transactions } = useWalletTransactions();

  const getTransactionIcon = (type: string) => {
    return type === 'refund' || type === 'cashback' || type === 'bonus' ? ArrowUpRight : ArrowDownRight;
  };

  const getTransactionColor = (type: string) => {
    return type === 'refund' || type === 'cashback' || type === 'bonus' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container-width py-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{isRTL ? 'المحفظة' : 'My Wallet'}</h1>
          <p className="text-muted-foreground mb-8">
            {isRTL ? 'إدارة رصيدك ومعاملاتك' : 'Manage your balance and transactions'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'الرصيد الحالي' : 'Current Balance'}</p>
                  <p className="text-2xl font-bold">{balance?.toFixed(2) || '0.00'} {isRTL ? 'ر.س' : 'SAR'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'نقاط الولاء' : 'Loyalty Points'}</p>
                  <p className="text-2xl font-bold">850</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي التوفير' : 'Total Saved'}</p>
                  <p className="text-2xl font-bold">1,245.50 {isRTL ? 'ر.س' : 'SAR'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'سجل المعاملات' : 'Transaction History'}</CardTitle>
          </CardHeader>
          <CardContent>
            {!transactions || transactions.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground">
                {isRTL ? 'لا توجد معاملات' : 'No transactions'}
              </p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction: any) => {
                  const Icon = getTransactionIcon(transaction.type);
                  const colorClass = getTransactionColor(transaction.type);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Icon className={`h-5 w-5 ${colorClass}`} />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className={`text-lg font-bold ${colorClass}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} {isRTL ? 'ر.س' : 'SAR'}
                        </p>
                        <Badge variant="outline">{transaction.type}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
