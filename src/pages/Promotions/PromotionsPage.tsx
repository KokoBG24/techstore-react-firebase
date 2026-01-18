import React from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

const PromotionsPage: React.FC = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4">Промоции</h2>

      <Row className="g-3">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Badge bg="danger" className="mb-2">-20%</Badge>
              <Card.Title>Седмична промоция</Card.Title>
              <Card.Text className="text-muted">
                Намаления на избрани смартфони и аксесоари.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Badge bg="danger" className="mb-2">-15%</Badge>
              <Card.Title>Гейминг оферти</Card.Title>
              <Card.Text className="text-muted">
                Периферия и аксесоари за гейминг конфигурации.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Badge bg="danger" className="mb-2">-10%</Badge>
              <Card.Title>Лаптопи</Card.Title>
              <Card.Text className="text-muted">
                Намаления на избрани модели лаптопи.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-muted mt-4">
        * Промоциите са примерни – можеш да ги вържеш към Firestore по-късно.
      </div>
    </Container>
  );
};

export default PromotionsPage;
