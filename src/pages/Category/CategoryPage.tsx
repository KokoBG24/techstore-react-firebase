// src/pages/Category/CategoryPage.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Breadcrumb,
  Card,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import { Product } from "../../types";
import { getProducts, getProductsByCategory } from "../../services/productService";

const categoryLabels: Record<string, string> = {
  all: "Всички продукти",
  cpu: "Процесори",
  gpu: "Видео карти",
  ram: "RAM памет",
  storage: "SSD / HDD",
  monitors: "Монитори",
  keyboards: "Клавиатури",
  mice: "Мишки",
  headsets: "Слушалки",
  laptops: "Лаптопи",
  gaming: "Гейминг",
  accessories: "Периферия",
  
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const isHardware = ["cpu", "gpu", "ram", "storage"].includes(
    categoryId ?? ""
  );

  const isPeripherals = [
    "monitors",
    "keyboards",
    "mice",
    "headsets",
    "accessories",
  ].includes(categoryId ?? "");

  useEffect(() => {
    if (!categoryId) return;

    if (categoryId === "all") {
      getProducts().then(setProducts);
      setLoading(false);
      return;
    }

    // 🔥 Ако сме в accessories – НЕ зареждаме продукти
    if (categoryId === "accessories") {
      setLoading(false);
      return;
    }

    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const categoryProducts = await getProductsByCategory(categoryId);
        setProducts(categoryProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Грешка при зареждане на продуктите");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  const categoryName =
    categoryLabels[categoryId ?? ""] ?? "Категория";

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <div className="mt-3">Зареждане...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <h4 className="text-danger">{error}</h4>
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={() => window.location.reload()}
        >
          Опитай пак
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* 🔥 BREADCRUMB */}
      <Breadcrumb className="mb-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Начало
        </Breadcrumb.Item>

        {isHardware && (
          <Breadcrumb.Item active>Хардуер</Breadcrumb.Item>
        )}

        {isPeripherals && (
          <Breadcrumb.Item active>Периферия</Breadcrumb.Item>
        )}

        {!isHardware && !isPeripherals && (
          <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
        )}

        {(isHardware || isPeripherals) && (
          <Breadcrumb.Item active>{categoryName}</Breadcrumb.Item>
        )}
      </Breadcrumb>

      <h2 className="mb-4">{categoryName}</h2>

      {/* 🔥 Ако е accessories → показваме подкатегории */}
      {categoryId === "accessories" ? (
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card
              className="h-100 shadow-sm text-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/monitors")}
            >
              <Card.Body>
                <i className="bi bi-display display-4 text-primary"></i>
                <h5 className="mt-3">Монитори</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="h-100 shadow-sm text-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/keyboards")}
            >
              <Card.Body>
                <i className="bi bi-keyboard display-4 text-success"></i>
                <h5 className="mt-3">Клавиатури</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="h-100 shadow-sm text-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/mice")}
            >
              <Card.Body>
                <i className="bi bi-mouse display-4 text-warning"></i>
                <h5 className="mt-3">Мишки</h5>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="h-100 shadow-sm text-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/category/headsets")}
            >
              <Card.Body>
                <i className="bi bi-headphones display-4 text-danger"></i>
                <h5 className="mt-3">Слушалки</h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">
            Няма намерени продукти в тази категория
          </h4>
        </div>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoryPage;