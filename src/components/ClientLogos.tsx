import Image from 'next/image';

export default function ClientLogos() {
  const industries = ['Automotriz', 'E-commerce', 'Educación', 'Salud', 'Finanzas'];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Industrias que confían en nosotros
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="w-32 h-32 relative">
              <Image
                src="/128x128.svg"
                alt={industry}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
