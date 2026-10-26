// Role göre menü. Satırlar utils/constants.js içindeki MENU_ITEMS'dan gelir.
// Sahip: Öğrenci 1
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MENU_ITEMS } from '../../utils/constants';

export default function Sidebar() {
  const { user } = useAuth();
  const items = MENU_ITEMS.filter((item) => item.roles.includes(user?.role));

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar__list">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
