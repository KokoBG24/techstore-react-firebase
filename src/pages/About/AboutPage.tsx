import React from "react";
import { Container, Card } from "react-bootstrap";

const AboutPage: React.FC = () => {
  return (
    <Container className="my-5" style={{ maxWidth: 900 }}>
      <h2 className="mb-4">За нас</h2>

      <Card className="p-4">
        <h5>TechStore</h5>
        <p className="text-muted mb-2">
          TechStore е уеб приложение за компютърни компоненти и периферия.
          Потребителите могат да разглеждат продукти по категории, да търсят,
          да добавят в количка и да правят поръчки.
        </p>

        <h6 className="mt-4">Цел на проекта</h6>
        <p className="text-muted mb-2">
          Дипломният проект демонстрира работа с React + TypeScript, Firebase Authentication,
          Firestore база данни, роли (admin/user) и администраторски панел за управление.
        </p>

        <h6 className="mt-4">Контакт</h6>
        <p className="text-muted mb-0">
          Email: support@techstore.bg (пример)
        </p>
      </Card>
    </Container>
  );
};

export default AboutPage;
