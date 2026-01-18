import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  console.log("REGISTER submit", email);

  if (password !== confirm) {
    setError("Паролите не съвпадат");
    return;
  }

  setSubmitting(true);
  try {
    await register(email.trim(), password);
    navigate("/");
  } catch (err: any) {
    console.error("REGISTER error:", err);
    setError(err?.message ?? "Грешка при регистрация");
  } finally {
    setSubmitting(false);
  }
};

  return (
  <Container className="my-5" style={{ maxWidth: 520 }}>
    <Card className="p-4">
      <h3 className="mb-3">Регистрация</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("FORM SUBMIT");
          onSubmit(e);
        }}
      >
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

        <Form.Group className="mb-3">
          <Form.Label>Парола</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Повтори парола</Form.Label>
          <Form.Control
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </Form.Group>

     <Button type="submit" disabled={submitting} className="w-100">
  {submitting ? "Създаване..." : "Създай профил"}
</Button>

      </Form>

      <div className="mt-3 text-center">
        Имаш профил? <Link to="/login">Вход</Link>
      </div>
    </Card>
  </Container>
);
};

export default RegisterPage;
