// src/pages/Category/CategoryPage.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import { Product } from '../../types';
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../services/productService';
import { Spinner } from 'react-bootstrap';





const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const categoryNames: Record<string, string> = {
    smartphones: 'Смартфони',
    laptops: 'Лаптопи',
    tvs: 'Телевизори',
    accessories: 'Аксесоари',
    gaming: 'Гейминг'
  };
useEffect(() => {
  const loadProducts = async () => {
    if (!categoryId) return;

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

 

  const categoryName = categoryNames[categoryId || ''] || 'Категория';

  if (loading) { if (error) {
  return (
    <Container className="my-5">
      <div className="text-center py-5">
        <h4 className="text-danger">{error}</h4>
        <Button variant="outline-primary" className="mt-3" onClick={() => window.location.reload()}>
          Опитай пак
        </Button>
      </div>
    </Container>
  );
}

    return (
      <Container className="my-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Зареждане на продукти...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button 
        variant="outline-primary" 
        className="back-to-categories mb-4"
        onClick={() => navigate('/')}
      >
        <i className="bi bi-arrow-left me-2"></i>Назад към категориите
      </Button>
      
      <h2 className="category-title">{categoryName}</h2>
      
     {products.length === 0 ? (
  <div className="text-center py-5">
    <h4 className="text-muted">Няма намерени продукти в тази категория</h4>
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


      {products.length === 0 && !loading && (
        <div className="text-center py-5">
          <h4 className="text-muted">Няма намерени продукти в тази категория</h4>
        </div>
      )}
    </Container>
  );
};

export default CategoryPage;