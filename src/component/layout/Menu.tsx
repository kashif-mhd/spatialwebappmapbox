import { Gauge, Locate, BarChart4 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Define an array of menu items
const menuItems = [
  { path: '/', icon: <Gauge />, label: 'Dashboard' },
  { path: '/map-view', icon: <Locate />, label: 'Map View' },
  { path: '/sales', icon: <BarChart4 />, label: 'Sales Search' },
];

const Menu = () => {
  return (
    <ul>
      {menuItems.map((item, index) => (
        <li key={index}>
          <NavLink to={item.path} className='flex-1 flex relative items-center text-sm gap-3 px-4 py-[9px] text-white transition-all duration-300'>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
