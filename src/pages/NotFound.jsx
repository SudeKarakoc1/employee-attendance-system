// Sahip: Öğrenci 1
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export default function NotFound() {
  return (
    <section className="page page--center">
      <h1>404 – Sayfa Bulunamadı</h1>
      <p className="muted">Aradığınız sayfa mevcut değil.</p>
      <Link to={ROUTES.HOME} className="btn">Ana sayfaya dön</Link>
    </section>
  );
}
