  // src/App.tsx
  import React from 'react';
  import { Routes, Route } from "react-router-dom";
  import { Container } from 'react-bootstrap';
  import { Toaster } from 'react-hot-toast';

  import LoginPage from "./pages/Auth/LoginPage";
  import RegisterPage from "./pages/Auth/RegisterPage";

  // Стилове
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import './styles/global.css';

  // Компоненти
  import Navigation from './components/layout/Navbar';
  import Footer from './components/layout/Footer';

  // Страници
  import HomePage from './pages/Home/HomePage';
  import CategoryPage from './pages/Category/CategoryPage';
  import CartPage from './pages/Cart/CartPage';
  import SearchPage from './pages/Search/SearchPage';

  // Contexts
  import { CartProvider } from './contexts/CartContext';
  import { SearchProvider } from './contexts/SearchContext';
  
  import AdminProductsPage from "./pages/Admin/AdminProductsPage";

  import MyOrdersPage from "./pages/Orders/MyOrdersPage";
import AdminOrdersPage from "./pages/Admin/AdminOrdersPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import PromotionsPage from "./pages/Promotions/PromotionsPage";
import AboutPage from "./pages/About/AboutPage";
import HardwarePage from "./pages/Category/HardwarePage";
import PeripheralsPage from "./pages/Category/PeripheralsPage";

  



function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <div className="App d-flex flex-column min-vh-100">
          <Navigation />

          <main className="flex-grow-1">
            <Container fluid>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/search" element={<SearchPage />} />

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Admin */}
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* Categories */}
                <Route path="/hardware" element={<HardwarePage />} />
                <Route path="/category/peripherals" element={<PeripheralsPage />} />

              </Routes>
            </Container>
          </main>

          <Footer />
          <Toaster position="top-right" />
        </div>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
