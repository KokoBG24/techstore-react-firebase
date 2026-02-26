// src/pages/About/AboutPage.tsx
import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import teamImage from "../../assets/images/team.jpg";

const AboutPage: React.FC = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4">За нас</h2>

      <Card className="shadow-sm p-4">
        <Card.Body>
          <Row className="align-items-center">
            {/* 📝 ТЕКСТ */}
            <Col md={7}>
              <h4>TechStore</h4>

              <p>
                TechStore е уеб приложение за компютърни компоненти и периферия.
                Потребителите могат да разглеждат продукти по категории, да търсят,
                да добавят в количка и да правят поръчки.
              </p>

              <h5 className="mt-4">Цел на проекта</h5>
              <p>
                Дипломният проект демонстрира работа с React + TypeScript,
                Firebase Authentication, Firestore база данни, роли (admin/user)
                и администраторски панел за управление.
              </p>

              <h5 className="mt-4">Контакт</h5>
              <p>Email: support@techstore.bg (пример)</p>

              {/* 🌈 СОЦИАЛНИ ИКОНИ */}
              <div className="mt-4">
                <h5>Последвайте ни</h5>

                <div className="d-flex gap-3 mt-3">
                <a href="#" className="social-icon instagram">
               <i className="bi bi-instagram"></i>
             </a>

              <a href="#" className="social-icon facebook">
              <i className="bi bi-facebook"></i>
               </a>

                 <a href="#" className="social-icon linkedin">
               <i className="bi bi-linkedin"></i>
                  </a>
            </div>
              </div>
            </Col>

            {/* 🖼️ СНИМКА */}
            <Col md={5} className="text-center mt-4 mt-md-0">
              <img
                src={teamImage}
                alt="TechStore Team"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutPage;