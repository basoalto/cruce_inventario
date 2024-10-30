import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar'; // Importa el componente Navbar

export default function Contact() {
  return (
    <SessionProvider>
  <Navbar />
    <div className="w-full py-12 lg:py-16">
      <div className="container flex flex-col gap-8 px-4 md:px-6">
        <div className="grid gap-4 md:gap-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact us</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="grid gap-4 md:gap-8">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={4} />
            </div>
            <div className="space-y-2">
              <Button size="lg">Submit</Button>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2 xl:gap-8">
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
        </div>
      </div>
    </div>
    </SessionProvider>
  )
}