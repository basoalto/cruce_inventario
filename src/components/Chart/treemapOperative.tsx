"use client";

import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface TreemapSystemOperative {
  data: any; // Datos que incluyen sucursales con sus modelos
  title: string; // Título del gráfico
}

const CustomTooltip = ({ active, payload }: any) => {
    if (payload && payload.length > 0) {
      const { name, value, modelos } = payload[0].payload;
  
      return (
        <div 
          className="tooltip bg-white border border-gray-300 rounded shadow-lg p-2 max-h-40 overflow-y-auto w-52 z-50 pointer-events-auto" // Asegura que el tooltip esté por encima y se pueda interactuar
          style={{ pointerEvents: 'auto' }} // Garantiza que se permita interactuar con el tooltip
        >
          <p className="text-black font-bold">{name}</p>
          <p className="text-black">Total: {value}</p>
          <ul className="text-black list-disc list-inside">
            {Object.entries(modelos).map(([modelo, count]: any) => (
              <li key={modelo}>{modelo}: {count}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };
  
  
  
  

const TreemapChart: React.FC<TreemapSystemOperative > = ({ data, title }) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00C49F', '#0088FE'];

  // Convierte el objeto de datos en un array de objetos
  const transformedData = Object.entries(data).map(([name, details]: any) => ({
    name,
    value: details.totalCount,
    modelos: details.modelos,
  }));

  return (
    <div className="w-50 mx-auto p-5">
      <h3 className="mb-2 text-left">{title}</h3>

      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={transformedData}
          dataKey="value"
          nameKey="name"
          stroke="#fff"
        >
          {transformedData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreemapChart;
