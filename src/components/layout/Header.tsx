// src/components/Header.tsx
import React from "react";
import Navbar from "./NavBar";

// Define the type for the toggleDarkMode prop
interface HeaderProps {
  toggleDarkMode: () => void; // You can specify the function signature if necessary
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode }) => {
  return (
    <header>
      <Navbar toggleDarkMode={toggleDarkMode} />
    </header>
  );
};

export default Header;
