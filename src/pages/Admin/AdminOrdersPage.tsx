import React, { useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAllOrders, Order, OrderStatus, updateOrderStatus } from "../../services/orderService";

const statusLabel: Record<OrderStatus, string> = {
  new: "Нова",
  processing: "Обработва се",
  shipped: "Изпратена",
  cancelled: "Отказана",
};

const AdminOrdersPage: React.FC = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useMemo(() => role === "admin", [role]);

  const [items, setItems] = useState<Order[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/login");
      else if (!isAdmin) navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await getAllOrders();
      setItems(data);
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Грешка при зареждане на поръчките.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((o) => o.status === filter);
  }, [items, filter]);

  const changeStatus = async (orderId: string, status: OrderStatus) => {
    setUpdatingId(orderId);
    setError("");
    try {
      await updateOrderStatus(orderId, status);
      setItems((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Грешка при промяна на статус.");
    } finally {
      setUpdatingId(null);
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Админ: Поръчки</h2>

        <div className="d-flex gap-2 align-items-center">
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            style={{ width: 220 }}
          >
            <option value="all">Всички</option>
            <option value="new">Нови</option>
            <option value="processing">Обработва се</option>
            <option value="shipped">Изпратени</option>
            <option value="cancelled">Отказани</option>
          </Form.Select>

          <Button variant="outline-secondary" onClick={load}>
            Обнови
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th style={{ width: 210 }}>ID</th>
            <th>Потребител</th>
            <th>Доставка</th>
            <th style={{ width: 120 }}>Сума</th>
            <th style={{ width: 160 }}>Статус</th>
            <th style={{ width: 260 }}>Промени статус</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td style={{ fontFamily: "monospace" }}>{o.id.slice(0, 10)}…</td>
              <td>{o.userEmail}</td>

              <td>
                {(o as any).delivery ? (
                  <>
                    <div><b>{(o as any).delivery.fullName}</b></div>
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      {(o as any).delivery.phone}
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {(o as any).delivery.address}
                    </div>
                  </>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </td>

              <td>{o.total.toFixed(2)} лв.</td>

              <td>
                <Badge bg="secondary">{statusLabel[o.status]}</Badge>
              </td>

              <td>
                <Form.Select
                  value={o.status}
                  disabled={updatingId === o.id}
                  onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                >
                  <option value="new">Нова</option>
                  <option value="processing">Обработва се</option>
                  <option value="shipped">Изпратена</option>
                  <option value="cancelled">Отказана</option>
                </Form.Select>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                Няма поръчки за избрания филтър.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrdersPage;
