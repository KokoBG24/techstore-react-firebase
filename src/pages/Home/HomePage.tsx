// src/pages/Home/HomePage.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'smartphones',
      name: 'Смартфони',
      icon: 'bi-phone',
      description: 'Най-новите модели'
    },
    {
      id: 'laptops',
      name: 'Лаптопи',
      icon: 'bi-laptop',
      description: 'За работа и игри'
    },
    {
      id: 'tvs',
      name: 'Телевизори',
      icon: 'bi-tv',
      description: '4K и Smart TV'
    },
    {
      id: 'accessories',
      name: 'Аксесоари',
      icon: 'bi-headphones',
      description: 'Периферия и добавки'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-4">
            Най-добрите технологии на достъпни цени
          </h1>
          <p className="lead mb-4">
            Открийте най-новите смартфони, лаптопи, телевизори и аксесоари с гаранция и бърза доставка
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            className="me-2"
            onClick={() => navigate('/category/smartphones')}
          >
            Разгледай продукти
          </Button>
          <Button variant="outline-light" size="lg">
            Промоции
          </Button>
        </Container>
      </section>

      {/* Categories Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5">Популярни категории</h2>
        <Row className="g-4">
          {categories.map(category => (
            <Col key={category.id} md={3}>
              <Card 
                className="category-card text-center p-4"
                onClick={() => navigate(`/category/${category.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`bi ${category.icon} display-4 text-primary mb-3`}></i>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text className="text-muted">{category.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Защо да пазарувате при нас?</h2>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <i className="bi bi-truck feature-icon"></i>
              <h5>Бърза доставка</h5>
              <p className="text-muted">Безплатна доставка за поръчки над 500 лв. в рамките на 24 часа</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-shield-check feature-icon"></i>
              <h5>Гаранция</h5>
              <p className="text-muted">Всички продукти са с гаранция от производителя</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-arrow-left-right feature-icon"></i>
              <h5>Лесно връщане</h5>
              <p className="text-muted">Връщане на продукти в рамките на 14 дни без да посочвате причина</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-headset feature-icon"></i>
              <h5>Поддръжка 24/7</h5>
              <p className="text-muted">Нашият екип е на ваше разположение денонощно</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Promotion Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="display-6 fw-bold">Специална промоция за лятото!</h2>
              <p className="lead">До 30% отстъпка на избрани продукти и безплатна доставка за поръчки над 500 лв.</p>
              <p className="small">Промоцията е валидна до 31.08.2023 г.</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="bg-white text-primary p-4 rounded">
                <h3 className="fw-bold">-30%</h3>
                <p className="mb-0">Отстъпка</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3 className="mb-3">Абонирайте се за нашия бюлетин</h3>
              <p className="mb-4">Получавайте известия за промоции, нови продукти и ексклузивни оферти</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Вашият имейл адрес" />
                <Button variant="light">Абонирай се</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;