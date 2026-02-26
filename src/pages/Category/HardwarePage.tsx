import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HardwarePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Хардуерни компоненти</h2>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm cursor-pointer"
            onClick={() => navigate("/category/cpu")}
          >
            <Card.Body>
              <i className="bi bi-cpu display-4 text-primary"></i>
              <h5 className="mt-3">Процесори</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm"
            onClick={() => navigate("/category/gpu")}
          >
            <Card.Body>
              <i className="bi bi-gpu-card display-4 text-danger"></i>
              <h5 className="mt-3">Видео карти</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm"
            onClick={() => navigate("/category/ram")}
          >
            <Card.Body>
              <i className="bi bi-memory display-4 text-success"></i>
              <h5 className="mt-3">RAM памет</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm"
            onClick={() => navigate("/category/storage")}
          >
            <Card.Body>
              <i className="bi bi-hdd display-4 text-warning"></i>
              <h5 className="mt-3">SSD / HDD</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HardwarePage;