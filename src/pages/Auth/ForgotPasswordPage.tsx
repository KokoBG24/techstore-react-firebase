import React, { useMemo, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";

const toNiceError = (code?: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "Невалиден имейл адрес.";
    case "auth/user-not-found":
      return "Няма профил с този имейл.";
    case "auth/too-many-requests":
      return "Твърде много опити. Изчакай малко и пробвай пак.";
    default:
      return "Неуспешно изпращане. Опитай отново след малко.";
  }
};

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const trimmedEmail = useMemo(() => email.trim(), [email]);
  const canSubmit = trimmedEmail.length > 3 && !sending;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDone(false);

    if (!trimmedEmail) return;

    setSending(true);
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/login`,
        handleCodeInApp: false,
      };

      await sendPasswordResetEmail(auth, trimmedEmail, actionCodeSettings);
      setDone(true);
    } catch (err: any) {
      console.error("RESET error:", err);
      setError(toNiceError(err?.code));
    } finally {
      setSending(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: 520 }}>
      <Card className="p-4 shadow-sm">
        <div className="d-flex align-items-center gap-2 mb-2">
          <i className="bi bi-shield-lock" style={{ fontSize: 22 }}></i>
          <h3 className="m-0">Забравена парола</h3>
        </div>

        <p className="text-muted mb-3">
          Въведи имейла си и ще ти изпратим линк за смяна на паролата.
        </p>

        {done && (
          <Alert variant="success" className="mb-3">
            <div className="fw-semibold">Изпратихме линк за смяна на парола.</div>
            <div className="mt-1">
              Проверете <b>{trimmedEmail}</b> (включително <b>Spam</b> / <b>Promotions</b>).
            </div>
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
              disabled={sending}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" disabled={!canSubmit}>
              {sending ? "Изпращане..." : done ? "Изпрати отново" : "Изпрати линк"}
            </Button>

            <Link to="/login" className="btn btn-outline-secondary">
              Назад към вход
            </Link>
          </div>
        </Form>

        <div className="mt-3 small text-muted">
          <div className="fw-semibold mb-1">Съвети:</div>
          <ul className="mb-0">
            <li>Провери папки <b>Spam</b> и <b>Promotions</b>.</li>
            <li>Понякога имейлът идва с няколко минути закъснение.</li>
            <li>Ако не получиш нищо, пробвай с друг имейл доставчик.</li>
          </ul>
        </div>
      </Card>
    </Container>
  );
};

export default ForgotPasswordPage;
