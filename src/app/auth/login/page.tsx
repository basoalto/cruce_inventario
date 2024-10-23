"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SessionProvider } from 'next-auth/react';
import Navbar from '../../../components/Navbar'; // Importa el componente Navbar

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    const res: any = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      console.log(res.error);
      setError(res.error);
    } else {
      router.push('/dashboard/inventory1');
    }
  });

  return (
    <SessionProvider>
      <Navbar /> {/* Agrega el Navbar aquí */}
      <div className="h-[calc(100vh)] flex justify-center items-center bg-white dark:bg-black">
        <Card className="w-full max-w-sm border-2 border-gray-300 shadow-2xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#111827] dark:text-white">Login</CardTitle>
            <CardDescription className="text-[#2563EB] dark:text-[#111827]">
              Introduzca su dirección de correo electrónico para acceder a su cuenta.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {error && (
              <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
                {error}
              </p>
            )}
            <form onSubmit={onSubmit}>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="email" className="text-[#111827] dark:text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email es obligatorio",
                    },
                  })}
                  placeholder="juan@gmail.com"
                  required
                  className="border-[#2563EB] dark:border-[#111827]"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {typeof errors.email.message === 'string' ? errors.email.message : 'Error desconocido'}
                  </span>
                )}
              </div>

              <div className="grid gap-2 mb-4">
                <Label htmlFor="password" className="text-[#111827] dark:text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es obligatoria",
                    },
                  })}
                  placeholder="******"
                  required
                  className="border-[#2563EB] dark:border-[#111827]"
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {typeof errors.password.message === 'string' ? errors.password.message : 'Error desconocido'}
                  </span>
                )}
              </div>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white dark:bg-[#111827] dark:text-[#2563EB] hover:bg-[#1d4ed8] dark:hover:bg-gray-800"
                >
                  Iniciar sesión
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </SessionProvider>
  );
}

export default LoginPage;
