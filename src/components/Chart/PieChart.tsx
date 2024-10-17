"use client";

import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any;
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => (
  <div className="w-40 ">
    <h3 className="mb-2 text-left">{title}</h3>
    {data ? <Pie data={data} /> : <p>Por favor, importa un archivo CSV para ver el gráfico.</p>}
  </div>
);

export default PieChart;
