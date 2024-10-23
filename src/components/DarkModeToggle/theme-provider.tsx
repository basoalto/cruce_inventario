"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      enableSystem={true} // Habilita el uso del tema del sistema
      defaultTheme="light" // Define el tema claro por defecto
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
