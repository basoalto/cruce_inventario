"use client";

import React, { useState } from 'react';
import { Treemap, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface TreemapChartProps {
  data: any; // Datos que incluyen sucursales con sus estados
  title: string; // Título del gráfico
}

// Componente Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0) {
    const { name, value, Robado, darDeBaja, porComprar, Activo } = payload[0].payload;

    return (
      <div className="tooltip bg-white border rounded shadow p-2">
        <p><strong>{name}</strong></p>
        <p>Valor total: {value}</p>
        <p>Estados:</p>
        <ul>
          <li>Robado: {Robado}</li>
          <li>Dar de Baja: {darDeBaja}</li>
          <li>Por Comprar: {porComprar}</li>
          <li>Activo: {Activo}</li>
        </ul>
      </div>
    );
  }
  return null;
};

const TreemapChart: React.FC<TreemapChartProps> = ({ data, title }) => {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]); // Estado para sucursales seleccionadas
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el desplegable

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00C49F', '#0088FE'];

  // Filtra los datos según las sucursales seleccionadas
  const filteredData = selectedBranches.length > 0
    ? data.filter((entry: any) => selectedBranches.includes(entry.name))
    : data; // Si no hay selección, muestra todos los datos

  // Maneja el cambio de los checkboxes
  const handleCheckboxChange = (name: string) => {
    if (selectedBranches.includes(name)) {
      setSelectedBranches(selectedBranches.filter((branch) => branch !== name));
    } else {
      setSelectedBranches([...selectedBranches, name]);
    }
  };

  // Alterna la visibilidad del desplegable
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-50 mx-auto p-5">
      <h3 className="mb-2 text-left">{title}</h3>

      {/* Botón para abrir/cerrar el desplegable */}
      <div className="dropdown mb-3">
        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={toggleDropdown}>
          Seleccionar Sucursales
        </button>

        {/* Lista desplegable de checkboxes */}
        {isDropdownOpen && (
          <div className="dropdown-menu show p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {data.map((entry: any, index: number) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`branch-${index}`}
                  checked={selectedBranches.includes(entry.name)}
                  onChange={() => handleCheckboxChange(entry.name)}
                />
                <label className="form-check-label" htmlFor={`branch-${index}`}>
                  {entry.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <Treemap
          data={filteredData}
          dataKey="value"
          nameKey="name"
          stroke="#fff"
        >
          {filteredData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default TreemapChart;
