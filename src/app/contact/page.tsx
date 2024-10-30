"use client";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SessionProvider } from 'next-auth/react';
import Navbar from '../../components/Navbar'; // Importa el componente Navbar

export default function Contact() {
  return (
    <SessionProvider>
  <Navbar />
    <div className="w-full py-12 lg:py-6">
      <div className="container flex flex-col gap-8 px-4 md:px-6">
        <div className="grid gap-4 md:gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Póngase en contacto con nosotros            </h1>
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
              <Label htmlFor="message">mensaje</Label>
              <Textarea id="message" placeholder="Introduzca su mensaje" rows={4} />
            </div>
            <div className="space-y-2 ">
              <Button size="lg">Enviar</Button>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2 xl:gap-8">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Support</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reach out to our support team for assistance with the platform.
            </p>
            <Link href="#" className="text-sm underline" prefetch={false}>
              Contact Support &rarr;
            </Link>
          </div>
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Sales</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Interested in learning more about the platform? Contact our sales team.
            </p>
            <Link href="#" className="text-sm underline" prefetch={false}>
              Contact Sales &rarr;
            </Link>
          </div>
        </div> */}
      </div>
    </div>
    </SessionProvider>
  )
}