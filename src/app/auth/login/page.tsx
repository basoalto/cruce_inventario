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

function LoginPage() {
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
      <div className="h-[calc(100vh-7rem)] flex justify-center items-center ">
      <Card className="w-full max-w-sm border-2 border-gray-300 shadow-2xl rounded-lg">
      <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  placeholder="juan@gmail.com"
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                  placeholder="******"
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
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




