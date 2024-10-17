import { Button } from "@/components/ui/button"

export default function SecondaryCTA() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para optimizar tu inventario tecnológico?
        </h2>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          Inicia tu Prueba Gratuita
        </Button>
      </div>
    </section>
  )
}