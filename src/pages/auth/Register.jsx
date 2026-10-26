// Kayıt sayfası. Sadece employee hesabı açar; başarılı kayıt sonrası otomatik giriş.
// Sahip: Öğrenci 1
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { validateRegisterForm } from '../../utils/validators';
import { ROUTES } from '../../utils/constants';

const INITIAL = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  position: '',
  hourlyRate: '',
};

export default function Register() {
  const { register } = useAuth();
  const { showAlert } = useAlert();

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateRegisterForm(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setSubmitting(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        position: values.position,
        hourlyRate: values.hourlyRate,
      });
      showAlert('Kayıt tamamlandı, hoş geldiniz', 'success');
      // Yönlendirmeyi GuestRoute yapar.
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name, label, type = 'text', extra = {}) => (
    <div className="form__field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={values[name]} onChange={handleChange} {...extra} />
      {errors[name] && <span className="form__error">{errors[name]}</span>}
    </div>
  );

  return (
    <section className="page page--center">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h1>Kayıt Ol</h1>

        {field('name', 'Ad Soyad', 'text', { autoComplete: 'name' })}
        {field('email', 'E-posta', 'email', { autoComplete: 'email' })}
        {field('password', 'Şifre', 'password', { autoComplete: 'new-password' })}
        {field('passwordConfirm', 'Şifre (tekrar)', 'password', { autoComplete: 'new-password' })}
        {field('position', 'Unvan', 'text')}
        {field('hourlyRate', 'Saatlik ücret (TRY)', 'number', { min: 1, step: 1 })}

        <div className="form__actions">
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Kaydediliyor…' : 'Kayıt Ol'}
          </button>
        </div>

        <p className="muted">
          Zaten hesabın var mı? <Link to={ROUTES.LOGIN}>Giriş yap</Link>
        </p>
      </form>
    </section>
  );
}
