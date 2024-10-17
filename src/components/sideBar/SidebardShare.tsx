// src/components/Sidebar.tsx
import Link from "next/link";
import { Package, Home, ShoppingCart } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch"; // Importa el switch de Shadcn
import { useTheme } from "next-themes"; // Importa el hook de tema de next-themes
import { useEffect, useState } from "react";
import { Sun, Moon } from 'lucide-react';

const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme(); // Usar el hook para manejar el tema

  // Estado para el toggle de dark mode
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Verificar si el modo oscuro está activo
    setEnabled(theme === "dark");
  }, [theme]);

  const toggleDarkMode = () => {
    setEnabled(!enabled);
    setTheme(enabled ? "light" : "dark"); // Cambiar entre light y dark
  };

  return (
    <div className="hidden border-r  md:block dark:bg-gray-800"> {/* Fondo oscuro para el modo oscuro */}
      <div className="flex h-4/5 max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100"> {/* Textos oscuros en modo oscuro */}
            <Package className="h-6 w-6" />
            <span>Acme Inc</span>
          </Link>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link href="/dashboard/inventory1" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <Home className="h-4 w-4" /> Inventario 1
          </Link>
          <Link href="/dashboard/inventory2" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <ShoppingCart className="h-4 w-4" /> Inventario 2
          </Link>
          <Link href="/dashboard/inventory3" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <ShoppingCart className="h-4 w-4" /> Inventario 3
          </Link>
          <Link href="/dashboard/inventory4" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <ShoppingCart className="h-4 w-4" /> Inventario 4
          </Link>
        </nav>


        {/* Toggle de modo oscuro con iconos */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleDarkMode}
              className="p-2  rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {enabled ? (
                <Sun className="w-6 h-6 text-yellow-400" /> // Icono de sol para modo oscuro
              ) : (
                <Moon className="w-6 h-6 text-gray-900" /> // Icono de luna para modo claro
              )}
            </button>
          </div>
        </div>

        <div className="">
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
