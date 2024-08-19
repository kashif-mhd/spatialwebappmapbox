import { Gauge, Locate, BarChart4 } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { path: '/', icon: <Gauge />, label: 'Dashboard' },
  { path: '/map-view', icon: <Locate />, label: 'Map View' },
  { path: '/dairy-form', icon: <Locate />, label: 'Dairy Form' },
  { path: '/sales-search', icon: <BarChart4 />, label: 'Sales Search' },
];

const Menu = () => {
  return (
    <ul>
      {menuItems.map((item, index) => (
        <li key={index}>
          <Link href={item.path} className='flex-1 flex relative items-center text-sm gap-3 px-4 py-[9px] text-white transition-all duration-300'>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
