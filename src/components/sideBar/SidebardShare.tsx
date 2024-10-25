import Link from "next/link";
import {
  BarChart,
  Package,
  ListChecks,
  PieChart,
  Sun,
  Moon,
  Home,
  ShoppingCart,
  Menu,
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; // Importa tus componentes Sheet
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(theme === "dark");
  }, [theme]);

  const toggleDarkMode = () => {
    setEnabled(!enabled);
    setTheme(enabled ? "light" : "dark");
  };

  return (
    <>
      {/* Menú para pantallas grandes */}
      <div className="hidden md:block border-r dark:bg-gray-800">
        <div className="flex h-4/5 max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href=""
              className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100"
            >
              <Image
                src="/logo-blanco.png"
                alt="Logo blanco"
                width={150}
                height={150}
                className={theme === "dark" ? "block" : "hidden"}
                priority={true}
              />
              <Image
                src="/logo-negro.png"
                alt="Logo negro"
                width={150}
                height={150}
                className={theme === "dark" ? "hidden" : "block"}
                priority={true}
              />
            </Link>
          </div>

          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard/metrics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <BarChart className="h-4 w-4" /> Dashboard
            </Link>
            <Link
              href="/dashboard/inventory1"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 1
            </Link>
            <Link
              href="/dashboard/inventory2"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 2
            </Link>
            <Link
              href="/dashboard/inventory3"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 3
            </Link>
            <Link
              href="/dashboard/inventory4"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 4
            </Link>
          </nav>

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

      {/* Menú para pantallas pequeñas */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute mt-3 left-4 md:hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col w-64 p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          <nav className="grid gap-3">
            <Link
              href="/dashboard/inventory1"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:text-primary text-gray-700 dark:text-gray-300 dark:hover:text-primary"
            >
              <Home className="h-4 w-4" /> Inventario 1
            </Link>
            <Link
              href="/dashboard/inventory2"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:text-primary text-gray-700 dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 2
            </Link>
            <Link
              href="/dashboard/inventory3"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:text-primary text-gray-700 dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 3
            </Link>
            <Link
              href="/dashboard/inventory4"
              className="flex items-center gap-3 px-3 py-2 transition-all hover:text-primary text-gray-700 dark:text-gray-300 dark:hover:text-primary"
            >
              <Package className="h-4 w-4" /> Inventario 4
            </Link>
            <div className="mt-auto p-4"></div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
