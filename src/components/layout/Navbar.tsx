// src/components/layout/Navbar.tsx
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useSearch } from "../../contexts/SearchContext";
import { Product } from "../../types";
import { getProducts } from "../../services/productService";
import { useAuth } from "../../contexts/AuthContext";


const Navigation: React.FC = () => {
  const { cartItems } = useCart();
  const { setSearchQuery, performSearch } = useSearch();
  const { user, role, signOut } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

 const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();

  const q = searchInput.trim();
  if (!q) return;

  try {
    const allProducts = await getProducts();

    setSearchQuery(q);
    performSearch(allProducts, q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  } catch (error) {
    console.error("Error loading products for search:", error);
  }
};


  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

return (
  <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
    <Container>
      {/* LOGO */}
      <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
        <i className="bi bi-laptop me-2"></i>TechStore
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>
        {/* LEFT NAV */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Начало</Nav.Link>

        {/* ✅ ONE dropdown only */}
<NavDropdown title="Категории" id="navbarDropdown">

  {/* HARDWARE */}
  <NavDropdown.Header>Хардуер</NavDropdown.Header>
<NavDropdown.Item as={Link} to="/hardware">
  Всички хардуерни компоненти
</NavDropdown.Item>

<NavDropdown.Divider />
  <NavDropdown.Divider />

  {/* PERIPHERALS */}
  <NavDropdown.Header>Периферия</NavDropdown.Header>

  <NavDropdown.Item as={Link} to="/category/monitors">
    Монитори
  </NavDropdown.Item>

  <NavDropdown.Item as={Link} to="/category/keyboards">
    Клавиатури
  </NavDropdown.Item>

  <NavDropdown.Item as={Link} to="/category/mice">
    Мишки
  </NavDropdown.Item>

  <NavDropdown.Item as={Link} to="/category/headsets">
    Слушалки
  </NavDropdown.Item>

  <NavDropdown.Divider />

  {/* OTHER */}
  <NavDropdown.Header>Други</NavDropdown.Header>

  <NavDropdown.Item as={Link} to="/category/laptops">
    Лаптопи
  </NavDropdown.Item>

  <NavDropdown.Item as={Link} to="/category/gaming">
    Гейминг
  </NavDropdown.Item>

</NavDropdown>

<Nav.Link as={Link} to="/promotions">Промоции</Nav.Link>
<Nav.Link as={Link} to="/about">За нас</Nav.Link>

{/* USER ORDERS */}
{user && (
  <Nav.Link as={Link} to="/orders">
    Моите поръчки
  </Nav.Link>
)}
          {/* ADMIN */}
          {role === "admin" && (
            <NavDropdown title="Админ" id="adminDropdown">
              <NavDropdown.Item as={Link} to="/admin/products">
                Продукти
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/orders">
                Поръчки
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-2">
          {/* SEARCH */}
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Търсене..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button type="submit" variant="outline-primary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          {/* AUTH */}
          {user ? (
            <>
              <span className="small text-muted">{user.email}</span>
              <Button size="sm" variant="outline-danger" onClick={handleLogout}>
                Изход
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline-primary" onClick={() => navigate("/login")}>
                Вход
              </Button>
              <Button size="sm" variant="primary" onClick={() => navigate("/register")}>
                Регистрация
              </Button>
            </>
          )}

          {/* CART */}
          <Button
            variant="outline-primary"
            className="position-relative"
            onClick={() => navigate("/cart")}
          >
            <i className="bi bi-cart3"></i>
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.reduce((t, i) => t + i.quantity, 0)}
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
