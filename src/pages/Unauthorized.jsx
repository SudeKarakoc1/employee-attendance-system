// Sahip: Öğrenci 1
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export default function Unauthorized() {
  return (
    <section className="page page--center">
      <h1>403 – Yetkisiz Erişim</h1>
      <p className="muted">Bu sayfayı görüntüleme yetkiniz yok.</p>
      <Link to={ROUTES.HOME} className="btn">Ana sayfaya dön</Link>
    </section>
  );
}
