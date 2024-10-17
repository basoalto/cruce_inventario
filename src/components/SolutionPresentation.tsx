import { Database, Brain, ClipboardCheck, BarChart2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SolutionPresentation() {
  const features = [
    { icon: Database, title: 'Centralización de Información', description: 'Unifica datos de múltiples sistemas y formatos.' },
    { icon: Brain, title: 'Análisis Avanzado con IA', description: 'Genera insights accionables automáticamente.' },
    { icon: ClipboardCheck, title: 'Auditorías sin Complicaciones', description: 'Simplifica procesos y asegura la conformidad normativa.' },
    { icon: BarChart2, title: 'Visualización en Tiempo Real', description: 'Dashboards interactivos para toma de decisiones ágil.' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestra Solución Integral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}