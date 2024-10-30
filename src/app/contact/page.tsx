"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SessionProvider } from 'next-auth/react';
import Navbar from '../../components/Navbar';

export default function Contact() {
  return (
    <SessionProvider>
      <Navbar />
      <div className="w-full py-12 lg:py-6">
        <div className="container flex flex-col gap-8 px-4 md:px-6">
          <div className="grid gap-4 md:gap-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Póngase en contacto con nosotros
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                ¿Tiene preguntas? Estamos aquí para ayudarle. Rellene el siguiente formulario y nos pondremos en contacto con usted lo antes posible.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="space-y-2 shadow-xl">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Introduzca su nombre" />
              </div>
              <div className="space-y-2 shadow-xl">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Introduzca su email" type="email" />
              </div>
              <div className="space-y-2 shadow-xl">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Introduzca su mensaje" rows={4} />
              </div>
              <div className="space-y-2">
                <Button size="lg">Enviar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
