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

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Sobre Nosotros", href: "#" },
    { name: "Servicios", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 text-black dark:text-white">
          <div className="flex items-center">
            <Link href="/">
            {/* Imagen para el tema oscuro */}
            <Image
              src="/logo-blanco.png"
              alt="Logo blanco"
              width={150}
              height={150}
              className={theme === "dark" ? "block" : "hidden"}
              priority={true}
            />
            {/* Imagen para el tema claro */}
            <Image
              src="/logo-negro.png"
              alt="Logo negro"
              width={150}
              height={150}
              className={theme === "dark" ? "hidden" : "block"}
              priority={true}
            />
            </Link>

            <span className="text-2xl font-bold text-primary dark:text-white">
              {componentName}
            </span>
          </div>

          {/* Menú en pantallas grandes */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-white"
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
                  <DropdownMenuContent
                    align="end"
                    forceMount
                    className="w-56 bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
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
                  className="bg-primary text-white hover:bg-secondary dark:bg-white dark:text-black px-3 py-2 rounded"
                >
                  Inicia sesión
                </Button>
              )}
            {/* Toggle de modo oscuro */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {enabled ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
          </div>

{/* Menú en pantallas pequeñas */}
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>
    </SheetTrigger>
    <SheetContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-secondary hover:text-primary text-sm font-medium dark:text-white"
          >
            {item.name}
          </Link>
        ))}
        {/* Botón de inicio de sesión o perfil en pantallas pequeñas */}
        {session ? (
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </Button>
        ) : (
          <Button onClick={() => signIn()} className="bg-primary text-white hover:bg-secondary dark:bg-white dark:text-black">
            Login
          </Button>
          
        )}

{/* Toggle de modo oscuro */}
<div className="flex justify-center w-full">
  <button
    onClick={toggleDarkMode}
    className="w-8 h-8 p-1 rounded-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center"
  >
    {enabled ? (
      <Sun className="w-4 h-4 text-yellow-400" />
    ) : (
      <Moon className="w-4 h-4 text-gray-900 dark:text-white" />
    )}
  </button>
</div>

      </div>
    </SheetContent>
  </Sheet>
</div>

        </div>
      </div>
    </nav>
  );
}
