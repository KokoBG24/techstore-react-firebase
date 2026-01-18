import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import { Product } from "../../types";
import { getProducts } from "../../services/productService";
import { Spinner } from "react-bootstrap";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts();

        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [query]);

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
      <h2>Резултати за „{query}“</h2>

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
