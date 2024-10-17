// src/components/Header.tsx
import Navbar from "./NavBar";

const Header = ({ toggleDarkMode }) => {
  return (
    <header>
      <Navbar toggleDarkMode={toggleDarkMode} />
    </header>
  );
};

export default Header;
