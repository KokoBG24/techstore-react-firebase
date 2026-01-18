import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate("/");
    } catch (err: any) {
      console.error("LOGIN error:", err);
      setError(err?.message ?? "Грешка при вход");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: 520 }}>
      <Card className="p-4">
        <h3 className="mb-3">Вход</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Парола</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              minLength={6}
            />
          </Form.Group>

          {/* ✅ BONUS LINKS */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/forgot-password" className="small text-decoration-none">
              Забравена парола?
            </Link>

            <span className="small text-muted">
              Нямаш профил?{" "}
              <Link to="/register" className="text-decoration-none">
                Регистрация
              </Link>
            </span>
          </div>

          <Button type="submit" disabled={submitting} className="w-100">
            {submitting ? "Влизане..." : "Вход"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
