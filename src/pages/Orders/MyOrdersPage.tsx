import React, { useEffect, useState } from "react";
import { Alert, Badge, Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getMyOrders, Order } from "../../services/orderService";

const MyOrdersPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setBusy(true);
      setError("");

      try {
        const data = await getMyOrders(user.uid);
        setItems(data);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Грешка при зареждане на поръчките.");
      } finally {
        setBusy(false);
      }
    };

    load();
  }, [user]);

  if (loading || busy) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <div className="mt-3">Зареждане...</div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-3">Моите поръчки</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {items.length === 0 ? (
        <div className="text-muted">Нямаш поръчки.</div>
      ) : (
        items.map((o) => (
          <Card key={o.id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div><b>Поръчка:</b> {o.id}</div>
                  <div><b>Сума:</b> {o.total.toFixed(2)} лв.</div>
                  <div><b>Статус:</b> <Badge bg="secondary">{o.status}</Badge></div>
                  {(o as any).delivery && (
              <div className="mt-2">
              <div><b>Доставка:</b> {(o as any).delivery.fullName}</div>
               <div><b>Телефон:</b> {(o as any).delivery.phone}</div>
              <div><b>Адрес:</b> {(o as any).delivery.address}</div>
           </div>
)}

                </div>
              </div>

              <hr />

              {o.items.map((it, idx) => (
                <div key={idx} className="d-flex justify-content-between">
                  <div>{it.name} × {it.quantity}</div>
                  <div>{(it.price * it.quantity).toFixed(2)} лв.</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyOrdersPage;
