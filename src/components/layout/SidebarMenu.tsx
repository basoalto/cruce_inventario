"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTachometerAlt, FaCog, FaTimes } from 'react-icons/fa';

interface SidebarProps {
  isVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleSidebar }) => {
  const [mounted, setMounted] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { key: 'Inventory 1', title: 'Inventory 1', href: '/dashboard/inventory1', icon: <FaTachometerAlt /> },
    { key: 'Inventory 2', title: 'Inventory 2', href: '/dashboard/inventory2', icon: <FaCog /> },
    { key: 'Inventory 3', title: 'Inventory 3', href: '/dashboard/inventory3', icon: <FaCog /> },
    { key: 'Inventory 4', title: 'Inventory 4', href: '/dashboard/inventory4', icon: <FaCog /> },
    { key: 'Inventory 5', title: 'Inventory 5', href: '/dashboard/inventory5', icon: <FaCog /> },
    { key: 'Inventory 6', title: 'Inventory 6', href: '/dashboard/inventory6', icon: <FaCog /> },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`w-48 min-h-screen bg-gray-100 p-4 shadow-md relative ${isVisible ? 'block' : 'hidden'}`}>
      {/* Ícono de cierre en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        {isVisible ? (
          <FaTimes size={24} onClick={toggleSidebar} className="cursor-pointer text-black" />
        ) : (
          <FaBars size={24} onClick={toggleSidebar} className="cursor-pointer text-black" />
        )}
      </div>

      {/* Sidebar contenido */}
      {isVisible && (
        <>
          <h2 className="text-lg font-semibold mb-4 text-black">Menu</h2>
          <ul className="list-none p-0">
            {menuItems.map(item => (
              <li key={item.key} className="mb-2">
                <Link href={item.href} className={`flex items-center p-2 rounded-md transition-colors 
                  ${activePath === item.href ? 'bg-blue-500 text-white' : 'text-black'}`} onClick={() => setActivePath(item.href)}>
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
