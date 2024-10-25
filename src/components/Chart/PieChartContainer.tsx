"use client";

import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartContainerProps {
  data: any;  // Puedes reemplazar 'any' con el tipo de datos correcto
  title: string;
}

const PieChartContainer: React.FC<PieChartContainerProps> = ({ data, title }) => (
  <div className="lg:w-full w-30 border border-gray-300 dark:border-gray-700 shadow rounded flex justify-center items-center p-4">
    <div className="lg:w-[50%] sm:w-[90%] text-center">
      <h3 className="mb-2 text-center">{title}</h3>
      {data ? (
        <Pie data={data} />
      ) : (
        <p>Por favor, importa un archivo CSV para ver el gráfico.</p>
      )}
    </div>
  </div>
);

export default PieChartContainer;
