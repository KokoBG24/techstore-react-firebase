import React, { useMemo, useState } from "react";
import { Container, Button, Card, Alert, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { createOrder } from "../../services/orderService";

const CartPage: React.FC = () => {
  const { cartItems, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState("");

  // доставка
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = useMemo(() => getTotalPrice(), [cartItems, getTotalPrice]);
  const totalQty = useMemo(() => cartItems.reduce((t, i) => t + i.quantity, 0), [cartItems]);

  const handleOrder = async () => {
    setError("");

    if (!user) {
      toast.error("Трябва да влезеш, за да направиш поръчка.");
      navigate("/login");
      return;
    }

    // валидация
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setError("Моля попълни име, телефон и адрес за доставка.");
      return;
    }

    if (cartItems.length === 0) return;

    setOrdering(true);
    try {
      const items = cartItems.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: (i.product as any).image ?? "",
      }));

      await createOrder({
        userId: user.uid,
        userEmail: user.email ?? "",
        items,
        total: Number(total.toFixed(2)),
        status: "new",
        // допълнителни полета (ще ги запише във Firestore)
        delivery: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
        } as any,
      } as any);

      clearCart();
      toast.success("Поръчката е направена успешно!");
      navigate("/orders");
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Грешка при създаване на поръчка.");
      toast.error("Грешка при поръчка.");
    } finally {
      setOrdering(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted"></i>
          <h2 className="mt-3">Количката ви е празна</h2>
          <p className="text-muted mb-4">Добавете продукти, за да продължите с пазаруването</p>
          <Link to="/" className="btn btn-primary btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Към начална страница
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h2 className="m-0">Количка ({totalQty} бр.)</h2>

        <Button variant="outline-danger" onClick={clearCart} disabled={ordering}>
          <i className="bi bi-trash me-2"></i>
          Изчисти количката
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Items */}
      <div className="mt-3">
        {cartItems.map((item) => (
          <Card key={item.product.id} className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <img
                  src={(item.product as any).image}
                  alt={item.product.name}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                  className="me-3"
                />

                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.product.name}</h5>
                  <p className="text-muted mb-2">{item.product.description}</p>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="text-primary fw-bold">{item.product.price} лв.</span>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        disabled={ordering}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        −
                      </Button>

                      <span style={{ minWidth: 32, textAlign: "center" }}>{item.quantity}</span>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        disabled={ordering}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>

                    <span className="text-muted">
                      = {(item.product.price * item.quantity).toFixed(2)} лв.
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-3"
                  disabled={ordering}
                  onClick={() => removeFromCart(item.product.id)}
                  title="Премахни"
                >
                  ✕
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Delivery form */}
      <Card className="mt-4">
        <Card.Body>
          <h5 className="mb-3">
            <i className="bi bi-truck me-2"></i>Данни за доставка
          </h5>

          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Име и фамилия</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Напр. Константин Пейчев"
                disabled={ordering}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Напр. 0888 123 456"
                disabled={ordering}
              />
            </Col>

            <Col md={12}>
              <Form.Label>Адрес</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Град, улица, номер, вход, етаж..."
                disabled={ordering}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary */}
      <Card className="mt-4">
        <Card.Body>
          <h4 className="text-center text-primary">Обща сума: {total.toFixed(2)} лв.</h4>

          <div className="d-grid gap-2 mt-3">
            <Button variant="primary" size="lg" onClick={handleOrder} disabled={ordering}>
              <i className="bi bi-bag-check me-2"></i>
              {ordering ? "Поръчване..." : "Поръчай"}
            </Button>

            <Link to="/orders" className="btn btn-outline-secondary">
              Моите поръчки
            </Link>

            <Link to="/" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Продължи пазаруването
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CartPage;
