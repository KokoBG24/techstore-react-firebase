// src/pages/Promotions/PromotionsPage.tsx
import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const promotions = [
  {
    discount: "-20%",
    title: "Седмична промоция",
    description: "Намаления на избрани процесори.",
    color: "danger",
  },
  {
    discount: "-15%",
    title: "Гейминг оферти",
    description: "Периферия и аксесоари за гейминг конфигурации.",
    color: "warning",
  },
  {
    discount: "-10%",
    title: "Лаптопи",
    description: "Намаления на избрани модели лаптопи.",
    color: "success",
  },
];

const PromotionsPage: React.FC = () => {
  return (
    <>
      {/* 🔥 Gradient Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a252f, #2c3e50)",
          padding: "60px 0",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 className="fw-bold">Промоции</h1>
        <p className="text-light mt-3">
          Възползвайте се от нашите ограничени оферти
        </p>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          {promotions.map((promo, index) => (
            <Col md={4} key={index}>
              <Card className="promo-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <Badge bg={promo.color} className="fs-6 px-3 py-2 mb-3">
                    {promo.discount}
                  </Badge>

                  <h4 className="fw-bold">{promo.title}</h4>
                  <p className="text-muted">{promo.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        
      </Container>
    </>
  );
};

export default PromotionsPage;