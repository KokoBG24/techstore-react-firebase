import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <div className="bg-light py-5 mb-5">
        <Container className="text-center">
          <h1 className="fw-bold mb-3">TechStore</h1>
          <p className="text-muted mb-4">
            Онлайн магазин за хардуерни компоненти, лаптопи и компютърна периферия
          </p>
          <Button size="lg" onClick={() => navigate("/category/cpu")}>
            Разгледай продуктите
          </Button>
        </Container>
      </div>

      {/* CATEGORIES */}
      <Container className="mb-5">
        <h2 className="mb-4 text-center">Категории</h2>

        <Row className="g-4">
          {/* HARDWARE */}
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-cpu display-4 text-primary"></i>
                <h5 className="mt-3">Хардуерни компоненти</h5>
                <p className="text-muted small">
                  Процесори, видео карти, RAM, SSD
                </p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate("/category/cpu")}
                >
                  Разгледай
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* PERIPHERALS */}
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-mouse display-4 text-success"></i>
                <h5 className="mt-3">Периферия</h5>
                <p className="text-muted small">
                  Мишки, клавиатури, слушалки, монитори
                </p>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => navigate("/category/monitors")}
                >
                  Разгледай
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* LAPTOPS */}
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-laptop display-4 text-warning"></i>
                <h5 className="mt-3">Лаптопи</h5>
                <p className="text-muted small">
                  Бизнес, гейминг и мултимедия
                </p>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => navigate("/category/laptops")}
                >
                  Разгледай
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* GAMING */}
          <Col md={6} lg={3}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <i className="bi bi-controller display-4 text-danger"></i>
                <h5 className="mt-3">Гейминг</h5>
                <p className="text-muted small">
                  Гейминг аксесоари и конфигурации
                </p>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => navigate("/category/gaming")}
                >
                  Разгледай
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
