import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Layout";
import { Footer } from "@/components/Footer";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

// Pages
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import ProductListing from "@/pages/ProductListing";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Account Pages (Customer)
import AccountProfile from "@/pages/account/Profile";
import AccountOrders from "@/pages/account/Orders";
import AccountAddresses from "@/pages/account/Addresses";
import AccountWishlist from "@/pages/account/Wishlist";
import AccountWallet from "@/pages/account/Wallet";

// Public Pages
import Pricing from "@/pages/Pricing";

// Merchant Dashboard Pages
import MerchantDashboard from "@/pages/merchant/Dashboard";

// Admin Dashboard Pages
import AdminDashboard from "@/pages/admin/Dashboard";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductListing} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/pricing" component={Pricing} />

      {/* Auth Routes */}
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route path="/auth/forgot-password" component={ForgotPassword} />

      {/* Customer Account Routes - Uses public Navbar */}
      <Route path="/account/profile" component={AccountProfile} />
      <Route path="/account/orders" component={AccountOrders} />
      <Route path="/account/addresses" component={AccountAddresses} />
      <Route path="/account/wishlist" component={AccountWishlist} />
      <Route path="/account/wallet" component={AccountWallet} />

      {/* Merchant Dashboard Routes - Uses MerchantLayout (no public Navbar) */}
      <Route path="/merchant/dashboard" component={MerchantDashboard} />

      {/* Admin Dashboard Routes - Uses AdminLayout (no public Navbar) */}
      <Route path="/admin/dashboard" component={AdminDashboard} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { locale } = useStore();
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  // Determine if we should show the public Navbar
  // Hide Navbar on merchant and admin dashboard pages
  const isMerchantDashboard = location.startsWith('/merchant');
  const isAdminDashboard = location.startsWith('/admin');
  const showNavbar = !isMerchantDashboard && !isAdminDashboard;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
          {showNavbar && <Navbar />}
          <div className="flex-1">
            <Router />
          </div>
          {showNavbar && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
