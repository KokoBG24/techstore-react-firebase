import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import teamImage from "../../assets/images/team.jpg";

const AboutPage: React.FC = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4">About Us</h2>

      <Card className="shadow-sm p-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={7}>
              <h4>TechStore</h4>

              <p>
                TechStore is a web application for computer components and peripherals.
                Customers can browse products by category, search, add items to the cart,
                and place orders.
              </p>

              <h5 className="mt-4">Project Goal</h5>
              <p>
                This diploma project showcases React and TypeScript together with Firebase
                Authentication, Firestore, user roles, and an admin panel for management.
              </p>

              <h5 className="mt-4">Contact</h5>
              <p>Email: support@techstore.bg</p>

              <div className="mt-4">
                <h5>Follow Us</h5>

                <div className="d-flex gap-3 mt-3">
                  <a href="https://instagram.com" className="social-icon instagram" aria-label="Instagram">
                    <i className="bi bi-instagram"></i>
                  </a>

                  <a href="https://facebook.com" className="social-icon facebook" aria-label="Facebook">
                    <i className="bi bi-facebook"></i>
                  </a>

                  <a href="https://linkedin.com" className="social-icon linkedin" aria-label="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </Col>

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
