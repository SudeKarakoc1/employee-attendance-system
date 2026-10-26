// Giriş sayfası. Doğrulama utils/validators.js, oturum useAuth().
// Sahip: Öğrenci 1
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { validateLoginForm } from '../../utils/validators';
import { ROUTES } from '../../utils/constants';

export default function Login() {
  const { login } = useAuth();
  const { showAlert } = useAlert();

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateLoginForm(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setSubmitting(true);
    try {
      const user = await login(values.email, values.password);
      showAlert(`Hoş geldiniz, ${user.name}`, 'success');
      // Yönlendirmeyi GuestRoute yapar (state.from veya role göre panel).
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page page--center">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1>Giriş Yap</h1>

        <div className="form__field">
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
        </div>

        <div className="form__field">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <span className="form__error">{errors.password}</span>}
        </div>

        <div className="form__actions">
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>
        </div>

        <p className="muted">
          Hesabın yok mu? <Link to={ROUTES.REGISTER}>Kayıt ol</Link>
        </p>
      </form>
    </section>
  );
}
