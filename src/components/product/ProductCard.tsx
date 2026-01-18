// src/components/product/ProductCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="product-card h-100">
      <div className="position-relative">
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            {product.originalPrice && (
              <span className="text-decoration-line-through text-muted me-2">
                {product.originalPrice} лв.
              </span>
            )}
            <span className="fw-bold text-primary">{product.price} лв.</span>
          </div>
          <Button 
            variant="primary" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <i className="bi bi-cart-plus"></i>
          </Button>
        </div>
        {!product.inStock && (
          <small className="text-danger mt-2">Не е в наличност</small>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;