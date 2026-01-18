// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { Product } from '../../types';
import { getProducts } from '../../services/productService';
import { useAuth } from "../../contexts/AuthContext"; 

// Тестови продукти за търсене
const testProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S23',
    price: 1359,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Най-новият флагман на Samsung с подобрена камера',
    category: 'smartphones',
    inStock: true,
    discount: 15,
    features: ['5G', '128GB', 'Android', '120Hz display']
  },
  {
    id: '2',
    name: 'iPhone 14 Pro',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Мощен iPhone с Dynamic Island и камера 48MP',
    category: 'smartphones',
    inStock: true,
    features: ['iOS', '256GB', '5G', 'A16 Bionic']
  },
  {
    id: '3',
    name: 'MacBook Pro 14"',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Мощен лаптоп за професионалисти с чип M2 Pro',
    category: 'laptops',
    inStock: true,
    features: ['macOS', '16GB RAM', '512GB SSD', 'M2 Pro']
  },
  {
    id: '4',
    name: 'Sony WH-1000XM4',
    price: 459,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Безжични слушалки с шумоподавяне',
    category: 'accessories',
    inStock: true,
    features: ['Безжични', 'Шумоподавяне', '30ч батерия', 'Bluetooth']
  }
];


const Navigation: React.FC = () => {
  const { cartItems } = useCart();
  const { setSearchQuery, performSearch } = useSearch();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
 

  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Search button clicked!', searchInput);

  
  
  if (searchInput.trim()) {
    console.log('Performing search for:', searchInput);
    
    try {
      // Опитай да вземеш продукти от Firebase
      const allProducts = await getProducts();
      
      // Ако няма продукти от Firebase, използвай тестовите
      const productsToSearch = allProducts.length > 0 ? allProducts : testProducts;
      
      setSearchQuery(searchInput);
      performSearch(productsToSearch, searchInput);
      navigate('/search');
      setSearchInput('');
    } catch (error) {
      console.error('Error loading products for search:', error);
      // При грешка, използвай тестовите продукти
      setSearchQuery(searchInput);
      performSearch(testProducts, searchInput);
      navigate('/search');
      setSearchInput('');
    }
  } else {
    console.log('Search input is empty');
  }
  
};

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
 const { user, role, signOut } = useAuth();


  const handleLogout = async () => {
  await signOut();
  navigate("/");
    };


  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: '#2c3e50' }}>
          <i className="bi bi-laptop me-2"></i>TechStore
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Начало</Nav.Link>
            <NavDropdown title="Категории" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/category/smartphones">Смартфони</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/laptops">Лаптопи</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/tvs">Телевизори</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/accessories">Периферия</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/gaming">Гейминг</NavDropdown.Item>
            </NavDropdown>
           <Nav.Link as={Link} to="/promotions">Промоции</Nav.Link>
          <Nav.Link as={Link} to="/about">За нас</Nav.Link>
            <Nav.Link href="#">Контакти</Nav.Link>
            {role === "admin" && (
            <Nav.Link as={Link} to="/admin/products">Админ</Nav.Link>
)}

          </Nav>
          
          <div className="d-flex align-items-center">
            {/* Search Form */}
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <InputGroup style={{ minWidth: '300px' }}>
                <Form.Control
                  type="search"
                  placeholder="Търсете продукти..."
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <Button 
                  variant="outline-primary" 
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>


           {user ? (
  <>
    <span className="me-2 fw-semibold">{user.email}</span>

    <Button
      variant="outline-danger"
      className="me-2"
      onClick={handleLogout}
    >
      Изход
    </Button>
  </>
) : (
  <>
    <Button
      variant="outline-primary"
      className="me-2"
      onClick={() => navigate("/login")}
    >
      Вход
    </Button>

    <Button
      variant="primary"
      className="me-2"
      onClick={() => navigate("/register")}
    >
      Регистрация
    </Button>
  </>
)}

            <Button 
              variant="outline-primary" 
              className="position-relative"
              onClick={() => navigate('/cart')}
              
            >
              <i className="bi bi-cart3"></i>
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;