import Link from "next/link";
import { BarChart, Package, ListChecks, PieChart } from "lucide-react"; // Cambié los iconos
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch"; // Importa el switch de Shadcn
import { useTheme } from "next-themes"; // Importa el hook de tema de next-themes
import { useEffect, useState } from "react";
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image'
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
    <div className="hidden border-r md:block dark:bg-gray-800">
      <div className="flex h-4/5 max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
        <Image 
          src={theme === "dark" ? "/logo blanco.png" : "/logo negro.png"}
          alt="Logo de la empresa" 
          width={130} // Especifica el ancho de la imagen
          height={130} // Especifica la altura de la imagen
          priority // Esto asegura que la imagen se cargue de inmediato para mejorar LCP
        />
      </Link>
    </div>

        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link href="/dashboard/metrics" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <BarChart className="h-4 w-4" /> {/* Ícono de métricas para el dashboard */}
            Dashboard
          </Link>
          <Link href="/dashboard/inventory1" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <Package className="h-4 w-4" /> {/* Ícono de lista para inventario 1 */}
            Inventario 1
          </Link>
          <Link href="/dashboard/inventory2" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <Package className="h-4 w-4" /> {/* Ícono de caja para inventario 2 */}
            Inventario 2
          </Link>
          <Link href="/dashboard/inventory3" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <Package className="h-4 w-4" /> {/* Ícono de caja para inventario 3 */}
            Inventario 3
          </Link>
          <Link href="/dashboard/inventory4" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary">
            <Package className="h-4 w-4" /> {/* Ícono de caja para inventario 4 */}
            Inventario 4
          </Link>

        </nav>

        {/* Toggle de modo oscuro con iconos */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {enabled ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
