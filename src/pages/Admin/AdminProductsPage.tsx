// src/pages/Admin/AdminProductsPage.tsx
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { Product } from "../../types";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../../services/productService";

type FormState = Omit<Product, "id"> & { id?: string };

const initialForm: FormState = {
  name: "",
  price: 0,
  originalPrice: undefined,
  image: "",
  description: "",
  category: "",
  inStock: true,
  discount: undefined,
  features: [],
};

const AdminProductsPage: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormState>(initialForm);

  // ✅ НОВО
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("none");

  const load = async () => {
    setBusy(true);
    setError("");
    try {
      const data = await getProducts();
      setItems(data);
    } catch (e) {
      setError("Грешка при зареждане на продуктите.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => setForm(initialForm);

  const startEdit = (p: Product) => {
    setForm({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: (p as any).originalPrice,
      image: (p as any).image,
      description: p.description,
      category: p.category,
      inStock: p.inStock,
      discount: (p as any).discount,
      features: (p as any).features ?? [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload: any = {
        name: form.name.trim(),
        price: Number(form.price),
        image: form.image.trim(),
        description: form.description.trim(),
        category: form.category,
        inStock: !!form.inStock,
        features: Array.isArray(form.features) ? form.features : [],
      };

      if (form.originalPrice) payload.originalPrice = Number(form.originalPrice);
      if (form.discount) payload.discount = Number(form.discount);

      if (!payload.name || !payload.image || !payload.category) {
        setError("Попълни име, снимка (URL) и категория.");
        return;
      }

      if (form.id) {
        await updateProduct(form.id, payload);
      } else {
        await addProduct(payload);
      }

      reset();
      await load();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Грешка при запис.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Сигурен ли си, че искаш да изтриеш продукта?")) return;

    setSaving(true);
    setError("");
    try {
      await deleteProduct(id);
      await load();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Грешка при изтриване.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ ФИЛТРИРАНЕ + СОРТИРАНЕ
  const filteredItems = items
    .filter((p) =>
      selectedCategory === "all" ? true : p.category === selectedCategory
    )
    .sort((a, b) => {
      if (priceSort === "asc") return a.price - b.price;
      if (priceSort === "desc") return b.price - a.price;
      return 0;
    });

  if (busy) {
    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" />
          <div className="mt-3">Зареждане...</div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-3">Админ: Управление на продукти</h2>

      {error && <Alert variant="danger">{error}</Alert>}

     <Card className="p-3 mb-4">
  <h5 className="mb-3">{form.id ? "Редакция" : "Добави продукт"}</h5>

  <Form onSubmit={onSubmit}>
    <Row className="g-3">

      <Col md={6}>
        <Form.Label>Име</Form.Label>
        <Form.Control
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
        />
      </Col>

      <Col md={3}>
        <Form.Label>Цена</Form.Label>
        <Form.Control
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm((s) => ({ ...s, price: Number(e.target.value) }))
          }
          min={0}
          required
        />
      </Col>

      <Col md={3}>
        <Form.Label>Категория</Form.Label>
        <Form.Select
          value={form.category}
          onChange={(e) =>
            setForm((s) => ({ ...s, category: e.target.value }))
          }
          required
        >
          <option value="">-- Избери категория --</option>

          <optgroup label="Хардуерни компоненти">
            <option value="cpu">Процесори</option>
            <option value="gpu">Видео карти</option>
            <option value="ram">RAM памет</option>
            <option value="storage">SSD / HDD</option>
          </optgroup>

          <optgroup label="Периферия">
            <option value="monitors">Монитори</option>
            <option value="keyboards">Клавиатури</option>
            <option value="mice">Мишки</option>
            <option value="headsets">Слушалки</option>
          </optgroup>

          <optgroup label="Други">
            <option value="laptops">Лаптопи</option>
            <option value="gaming">Гейминг</option>
          </optgroup>
        </Form.Select>
      </Col>

      <Col md={12}>
        <Form.Label>Снимка (URL)</Form.Label>
        <Form.Control
          value={form.image}
          onChange={(e) =>
            setForm((s) => ({ ...s, image: e.target.value }))
          }
          required
        />
      </Col>

      <Col md={12}>
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
        />
      </Col>

      <Col md={3}>
        <Form.Label>Оригинална цена</Form.Label>
        <Form.Control
          type="number"
          value={form.originalPrice ?? ""}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              originalPrice: e.target.value
                ? Number(e.target.value)
                : undefined,
            }))
          }
        />
      </Col>

      <Col md={3}>
        <Form.Label>Отстъпка %</Form.Label>
        <Form.Control
          type="number"
          value={form.discount ?? ""}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              discount: e.target.value
                ? Number(e.target.value)
                : undefined,
            }))
          }
        />
      </Col>

      <Col md={3} className="d-flex align-items-end">
        <Form.Check
          type="checkbox"
          label="В наличност"
          checked={form.inStock}
          onChange={(e) =>
            setForm((s) => ({ ...s, inStock: e.target.checked }))
          }
        />
      </Col>

      <Col md={12} className="d-flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Запис..." : form.id ? "Запази" : "Добави"}
        </Button>

        {form.id && (
          <Button
            variant="secondary"
            onClick={reset}
            disabled={saving}
          >
            Откажи
          </Button>
        )}

        <Button
          variant="outline-secondary"
          onClick={load}
          disabled={saving}
        >
          Обнови
        </Button>
      </Col>

    </Row>
  </Form>
</Card>

      {/* ✅ ФИЛТРИ */}
      <div className="d-flex gap-3 mb-3">
        <Form.Select
          className="w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Всички категории</option>
          <option value="cpu">CPU</option>
          <option value="gpu">GPU</option>
          <option value="ram">RAM</option>
          <option value="storage">Storage</option>
          <option value="monitors">Монитори</option>
          <option value="keyboards">Клавиатури</option>
          <option value="mice">Мишки</option>
          <option value="headsets">Слушалки</option>
          <option value="laptops">Лаптопи</option>
          <option value="gaming">Гейминг</option>
        </Form.Select>

        <Form.Select
          className="w-auto"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
        >
          <option value="none">Сортиране по цена</option>
          <option value="asc">Цена ↑ (Най-ниска)</option>
          <option value="desc">Цена ↓ (Най-висока)</option>
        </Form.Select>
      </div>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Име</th>
            <th>Категория</th>
            <th>Цена (€)</th>
            <th>Наличност</th>
            <th style={{ width: 220 }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price.toFixed(2)} €</td>
              <td>{p.inStock ? "Да" : "Не"}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => startEdit(p)}>
                  Редакция
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => remove(p.id)}>
                  Изтрий
                </Button>
              </td>
            </tr>
          ))}

          {filteredItems.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                Няма продукти.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProductsPage;