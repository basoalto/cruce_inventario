"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes"; // Importa el hook de tema de next-themes
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  componentName?: string;
}

export default function Navbar({ componentName }: NavbarProps) {
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

  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sobre Nosotros", href: "#" },
    { name: "Servicios", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  return (
    <nav className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 text-black dark:text-white">
          <div className="flex items-center">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={150} // especifica el ancho de la imagen
              height={150} // especifica la altura de la imagen
              priority={true} // si esta imagen es importante para LCP, usa esta opción
            />
            <span className="text-2xl font-bold text-sky-400">
              {componentName}
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              
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

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-black dark:text-white hover:bg-sky-400 dark:hover:bg-sky-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => await signOut({ callbackUrl: "/" })}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => signIn()}
                  className="bg-sky-400 dark:bg-sky-600 text-white px-3 py-2 rounded"
                >
                  Login
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-white dark:bg-gray-900">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-black dark:text-white hover:bg-sky-400 dark:hover:bg-sky-600 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {session ? (
                    <Button
                      variant="ghost"
                      onClick={async () => await signOut({ callbackUrl: "/" })}
                      className="justify-start text-black dark:text-white"
                    >
                      Log out
                    </Button>
                  ) : (
                    <Button onClick={() => signIn()} className="justify-start text-black dark:text-white">
                      Log in
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
