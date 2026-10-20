import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { MainLayout } from '@/components/layout/MainLayout'
import { ErrorBoundary } from '@/app/ErrorBoundary'
import { Providers } from '@/app/providers'
import { AuthProvider, useAuth } from '@/features/auth/context/AuthContext'
import { AdminRoute, GuestRoute, ProtectedRoute } from '@/features/auth/components/RouteGuards'
import { default as AdminPage } from '@/features/admin/pages/AdminPage'
import { default as AccountPage } from '@/features/account/pages/AccountPage'
import { default as RegisterPage } from '@/features/auth/pages/RegisterPage'
import { default as LoginPage } from '@/features/auth/pages/LoginPage'
import { default as ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { default as ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { default as VerifyEmailPage } from '@/features/auth/pages/VerifyEmailPage'
import { default as CartPage } from '@/features/cart/pages/CartPage'
import { default as CheckoutPage } from '@/features/checkout/pages/CheckoutPage'
import { default as HomePage } from '@/features/home/pages/HomePage'
import { default as BrandPage } from '@/features/brands/pages/BrandPage'
import { default as BrandsPage } from '@/features/brands/pages/BrandsPage'
import { default as AboutPage } from '@/features/home/pages/AboutPage'
import { default as ContactPage } from '@/features/home/pages/ContactPage'
import { default as FAQPage } from '@/features/home/pages/FAQPage'
import { default as PrivacyPage } from '@/features/home/pages/PrivacyPage'
import { default as ShippingPage } from '@/features/home/pages/ShippingPage'
import { default as ReturnsPage } from '@/features/home/pages/ReturnsPage'
import { default as TermsPage } from '@/features/home/pages/TermsPage'
import { default as CategoryPage } from '@/features/categories/pages/CategoryPage'
import { default as SearchPage } from '@/features/search/pages/SearchPage'
import { default as ProductDetailsPage } from '@/features/products/pages/ProductDetailsPage'
import { default as ProductsPage } from '@/features/products/pages/ProductsPage'
import { default as RequestQuotePage } from '@/features/quotes/pages/RequestQuotePage'
import NotFoundPage from '@/components/feedback/NotFoundPage'
import UnauthorizedPage from '@/components/feedback/UnauthorizedPage'

function AppShell() {
  const { restoring } = useAuth()

  if (restoring) {
    return <div className="container py-20 text-center text-muted">Restoring your session…</div>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-soft">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailsPage />} />
            <Route path="/categories/:categorySlug" element={<CategoryPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:brandSlug" element={<BrandPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/request-quote" element={<RequestQuotePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
          </Route>

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </Providers>
    </ErrorBoundary>
  )
}
