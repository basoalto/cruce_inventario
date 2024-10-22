import { AlertTriangle, Database, FileSearch } from 'lucide-react';

export default function ProblemDescription() {
  const challenges = [
    { icon: AlertTriangle, title: 'Dispersión', description: 'Inventarios tecnológicos dispersos en múltiples sistemas.' },
    { icon: Database, title: 'Inconsistencia', description: 'Datos inconsistentes que dificultan la toma de decisiones.' },
    { icon: FileSearch, title: 'Complejidad', description: 'Procesos de auditoría complejos y propensos a errores.' },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Desafíos en la Gestión de Inventarios Tecnológicos
        </h2>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          ¿Enfrentas desafíos con inventarios tecnológicos dispersos, datos inconsistentes y procesos de auditoría complejos? 
          Descubre cómo Cruce de Inventario transforma estos retos en oportunidades de mejora.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
