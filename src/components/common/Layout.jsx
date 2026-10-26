// Girişli sayfaların ortak çerçevesi: Navbar üstte, Sidebar solda, içerik <Outlet/>.
// Sahip: Öğrenci 1
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
