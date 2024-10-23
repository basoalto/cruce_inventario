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
<nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 text-black dark:text-white">
      <div className="flex items-center">
      <Link href="/">
        <Image
          src="/logo2.png"
          alt="Logo"
          width={150}
          height={150}
          priority={true}
        />
      </Link>

        <span className="text-2xl font-bold text-primary">
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
              className="text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
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
              <DropdownMenuContent  align="end" forceMount
              className="w-56 align-end forceMount bg-black text-white dark:bg-white dark:text-black"
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
              className="bg-primary text-white hover:bg-secondary px-3 py-2 rounded"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>

  );
}
