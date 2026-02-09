import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import { Product } from "../../types";
import { getProducts } from "../../services/productService";

const normalize = (v?: string) => (v ?? "").toLowerCase().trim();

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryRaw = searchParams.get("q") || "";
  const q = useMemo(() => normalize(queryRaw), [queryRaw]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      // ако няма query – не търсим
      if (!q) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const allProducts = await getProducts();

        const filtered = allProducts.filter((p) => {
          const name = normalize(p.name);
          const description = normalize((p as any).description);
          const category = normalize((p as any).category);
          const features = ((p as any).features ?? []).join(" ").toLowerCase();

          return (
            name.includes(q) ||
            description.includes(q) ||
            category.includes(q) ||
            features.includes(q)
          );
        });

        setProducts(filtered);
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [q]);

  if (!q) {
    return (
      <Container className="my-5">
        <h2>Търсене</h2>
        <p className="text-muted mt-3">Въведи текст в полето за търсене.</p>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Търсене...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Резултати за „{queryRaw}“</h2>

      {products.length === 0 ? (
        <p className="text-muted mt-4">Няма намерени продукти</p>
      ) : (
        <Row className="g-4 mt-3">
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

export default SearchPage;
