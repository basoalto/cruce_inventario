import { Sun, Moon } from "lucide-react";  // Importar los íconos

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, toggleDarkMode }) => (
  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition mb-4">
    {darkMode ? (
      <Sun className="w-6 h-6 text-yellow-500" />  // Ícono de sol para modo claro
    ) : (
      <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />  // Ícono de luna para modo oscuro
    )}
  </button>
);

export default DarkModeToggle;
