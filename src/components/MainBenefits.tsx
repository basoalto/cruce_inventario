import { Check } from 'lucide-react'
import Image from 'next/image'

export default function MainBenefits() {
  const benefits = [
    'Optimiza costos operativos con gestión eficiente de activos',
    'Ahorra tiempo con automatización de inventarios y reportes',
    'Minimiza riesgos de seguridad con visibilidad completa de tus activos',
    'Mejora la toma de decisiones con análisis predictivo basado en IA',
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Beneficios Principales</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px]">
            <Image
              src={"/images/image1.jpg"}
              alt="Beneficios en acción"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}