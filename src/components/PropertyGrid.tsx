"use client";

import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Property } from '../types/Properties';
import { ColDef } from 'ag-grid-community';

interface PropertyGridProps {
  dataProperties: Property[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ dataProperties }) => {
  const [rowData, setRowData] = useState<Property[]>([]);
  const [paginationPageSize] = useState<number>(10);

  useEffect(() => {
    setRowData(dataProperties);
  }, [dataProperties]);

  const columns: ColDef<Property>[] = [
    { headerName: "ID", field: "id" },
    { headerName: "Tipo", field: "type" },
    { headerName: "Región", field: "region" },
    { headerName: "Municipio", field: "municipality" },
    { headerName: "Dirección", field: "address" },
    { headerName: "Departamento", field: "department" },
    { headerName: "Rol", field: "rol" },
    { headerName: "Propietario", field: "owner" },
    { headerName: "Estado", field: "status" },
    { headerName: "Fecha Último Proceso", field: "last_process_date" },
    { headerName: "Creado", field: "created" },
    { headerName: "Modificado", field: "modified" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        columnDefs={columns}
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationPageSize}
      />
    </div>
  );
};

export default PropertyGrid;
