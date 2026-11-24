import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './context/AuthProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import VendorPage from './pages/VendorPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import CartPage from './pages/CartPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import FavouritesPage from './pages/FavouritesPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            {/* Public routes */}
                            <Route index element={<HomePage />} />
                            <Route path="vendor/:id" element={<VendorPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />

                            {/* Protected routes require a signed-in user. */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="cart" element={<CartPage />} />
                                <Route path="orders" element={<OrdersPage />} />
                                <Route path="favourites" element={<FavouritesPage />} />
                            </Route>

                            {/* Display this page for unknown routes. */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App