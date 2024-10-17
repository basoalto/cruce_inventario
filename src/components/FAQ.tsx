import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const faqData = [
    {
      question: "¿Qué es Cruce de Inventario?",
      answer: "Cruce de Inventario es una plataforma SaaS que centraliza y analiza la información de inventarios tecnológicos de múltiples fuentes. Ofrece una visión unificada en tiempo real de todos los activos digitales, optimizando costos, mejorando la seguridad y facilitando el cumplimiento normativo mediante capacidades de IA y análisis avanzado."
    },
    {
      question: "¿Cómo funciona la centralización de información?",
      answer: "La centralización se logra en tres pasos: 1) Integración con múltiples fuentes de datos, 2) Normalización automática para asegurar consistencia, y 3) Consolidación en una única base de datos accesible a través de nuestra interfaz intuitiva. Esto proporciona una visión completa y actualizada de todos los activos tecnológicos."
    },
    {
      question: "¿Qué beneficios ofrece el análisis avanzado con IA?",
      answer: "El análisis con IA ofrece: predicción de necesidades de mantenimiento, detección de anomalías para seguridad, optimización de recursos, generación automática de insights valiosos, y un asistente virtual para consultas complejas. Esto permite una gestión proactiva y una toma de decisiones más informada sobre los activos tecnológicos."
    },
    {
      question: "¿Cómo mejora la seguridad de mis activos digitales?",
      answer: "Mejoramos la seguridad mediante: visibilidad completa del inventario, monitoreo en tiempo real con alertas, controles de acceso basados en roles, facilitación del cumplimiento normativo (ISO 27001), y análisis de riesgos con IA para prevenir brechas de seguridad. Esto asegura una protección integral de sus activos digitales."
    },
    {
      question: "¿Cómo protege Cruce de Inventario la privacidad y seguridad de los datos?",
      answer: "Protegemos sus datos mediante: encriptación de grado militar (AES-256), autenticación multifactor, auditorías de seguridad regulares, cumplimiento con estándares como GDPR y SOC 2, aislamiento estricto de datos entre clientes, y copias de seguridad cifradas en múltiples ubicaciones. La seguridad y privacidad son nuestra máxima prioridad."
    }
  ]
  
  export function FAQ() {
    return (
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }