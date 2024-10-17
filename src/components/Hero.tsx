"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  // Definimos las variantes de animación
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        {/* Animación para el título */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold leading-tight"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8 }}
        >
          Fortalece la Integridad de tus Activos Digitales
        </motion.h1>
        
        {/* Animación para el párrafo */}
        <motion.p 
          className="text-xl md:text-2xl"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Centraliza, analiza y optimiza tu inventario tecnológico con IA y gestión eficiente
        </motion.p>
        
        {/* Animación para el botón */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Solicita una Demo Gratuita
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
