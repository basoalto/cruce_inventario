"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Providers from "../../../components/Providers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sideBar/SidebardShare";
import Header from "@/components/layout/Header";

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { read, utils } from 'xlsx';  // Librería para procesar archivos CSV/Excel
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { exportAllToXLSX } from "@/utils/fileUtils";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import { openDatabase, saveCsvData, loadDataAndProcess } from "@/utils/database"; // Asegúrate de importar correctamente
import MetricsSection from "@/components/Table/MetricsSectionInventory2";
import PieChartContainer from "@/components/Chart/PieChartContainer";
import FileUploadButtons from "@/components/Table/FileUploadButtons";
import InventoryTable from "@/components/Table/InventoriesTable";
import TreemapChart  from "@/components/Chart/treemap";

Chart.register(ArcElement, Tooltip, Legend);

function DashboardPage1() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");  const { data: session, status } = useSession();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [treemapData, setTreemapData] = useState([]);
  const [columns, setColumns] = useState<any[]>([]);

  const [loadingCSV, setLoadingCSV] = useState(true); // Track CSV data loading
  const [metrics, setMetrics] = useState({ total: 0, stock: 0, activo: 0, robado: 0 });


  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
    loadDataAndProcess(32, 'csvStore3', setCsvData, setChartData, setChartData2, setMetrics, 'Activo','Stock', 'Robado', 'Tipo', 'Marca');
  }, [status]);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);
  
  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode); // Cambiar el estado
  };
  
  
  const getThirdObject = async () => {
    try {
      const db: any = await openDatabase('csvStore3'); 
  
      const transaction = db.transaction("csvStore3", "readonly"); 
      const store = transaction.objectStore("csvStore3"); 
  
      const request = store.getAll(); 
  
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          exportAllToXLSX(result);
        } else {
          console.log("No se encontró el objeto.");
        }
      };
  
      request.onerror = (event: any) => {
        console.error("Error al recuperar el tercer objeto: ", event.target.errorCode);
      };
    } catch (error) {
      console.error("Error al interactuar con IndexedDB: ", error);
    }
  };
  

  const handleFileExport = () => {
    getThirdObject()
  };


  interface ItemData {
    Sucursal: string;
    Estado: 'Robado' | 'Dar de Baja' | 'Por Comprar' | 'Activo' | string; // Estado puede ser uno de estos valores o un valor desconocido
  }
  
  interface SucursalData {
    totalCount: number;
    Robado: number;
    'Dar de Baja': number;
    'Por Comprar': number;
    Activo: number;
  }
  
  type GroupedData = Record<string, SucursalData>;
// Procesar los datos para el gráfico de árbol
const processTreemapData = (jsonData: ItemData[]): Array<{
  name: string;
  value: number;
  Robado: number;
  darDeBaja: number;
  porComprar: number;
  Activo: number;
}> => {
  // Agrupar los datos por sucursal y estado
  const groupedData: GroupedData = jsonData.reduce((acc: GroupedData, item: ItemData) => {
    const sucursal = item.Sucursal || 'Desconocida';
    const estado = item.Estado || 'Desconocido';

    // Si no existe la sucursal, inicialízala
    if (!acc[sucursal]) {
      acc[sucursal] = {
        totalCount: 0,    // Contador total de elementos
        'Robado': 0,
        'Dar de Baja': 0,
        'Por Comprar': 0,
        'Activo': 0
      };
    }

    // Incrementa el contador para el total de la sucursal
    acc[sucursal].totalCount += 1;

    // Contar los estados solo si son parte de los estados predefinidos
    if (estado in acc[sucursal]) {
      acc[sucursal][estado as keyof SucursalData] += 1; // Incrementa el contador del estado
    }

    return acc; // Devuelve el acumulador para la siguiente iteración
  }, {} as GroupedData); 

  // Convertir los datos en el formato necesario para el gráfico de árbol
  return Object.entries(groupedData).map(([sucursal, { totalCount, Robado, 'Dar de Baja': darDeBaja, 'Por Comprar': porComprar, Activo }]) => {
    return {
      name: sucursal,        // La sucursal es la categoría principal
      value: totalCount,     // El valor total para la sucursal (suma de todos los estados)
      Robado,                // Contador de estado "Robado"
      darDeBaja,             // Contador de estado "Dar de Baja"
      porComprar,            // Contador de estado "Por Comprar"
      Activo                 // Contador de estado "Activo"
    };
  });
};




  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[2]];
        const jsonData:any = utils.sheet_to_json(sheet);
        // Generar columnas dinámicamente a partir del primer registro
        if (jsonData.length > 0) {
          const dynamicColumns = Object.keys(jsonData[0]).map((key) => ({
            headerName: key,
            field: key,
          }));
          setColumns(dynamicColumns);
        }

        // Procesar los datos para el gráfico de árbol
        const treemapProcessedData: any = processTreemapData(jsonData);  // Define cómo procesar los datos para el gráfico
        setTreemapData(treemapProcessedData);
        setCsvData(jsonData);
        setLoadingCSV(false);
        saveCsvData(32, jsonData,'csvStore3',setCsvData,setChartData,setChartData2,setMetrics, 'Activo','Stock', 'Robado', 'Tipo', 'Marca')
      };
      reader.readAsArrayBuffer(file);
    }else{
      console.log('error')
    }
  };

  
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (session) {
    return (
  <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
    {/* Sidebar */}
    <Sidebar />

    {/* Contenedor principal */}
  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    {/* Header */}

    {/* Título de la página */}
    <div className="flex items-center">
      <h1 className="text-lg font-semibold md:text-2xl">Inventario de Bajas</h1>
    </div>

{/* Contenedor del contenido principal */}
<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mx-auto max-w-full">
  <div className="flex flex-col w-full p-5 max-w-5xl">
    <div className="w-full mt-8">
      {/* Interruptor de modo oscuro */}
      {/* <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
      
      {/* Sección de métricas */}
      <MetricsSection metrics={metrics} />
      
      {/* Gráficos de torta */}
      <div className="flex flex-col lg:flex-row justify-between py-5 gap-5">
        <PieChartContainer data={chartData} title="Distribución por Tipo" />
        <PieChartContainer data={chartData2} title="Distribución de Inventario por Marca" />
      </div>
      
      {/* Gráficos de Tree */}
      <div className="mb-3 pb-5">
        <TreemapChart data={treemapData} title="Recuento de Estado por Sucursal" />
      </div>

      {/* Tabla con ag-Grid */}
      <div className="w-full p-5 border border-gray-300 dark:border-gray-700 shadow rounded mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <h3 className="text-left">Detalle Inventario</h3>
          <FileUploadButtons handleFileUpload={handleFileUpload} handleFileExport={handleFileExport} />
        </div>
        <InventoryTable csvData={csvData} columns={columns} />
      </div>
    </div>
  </div>
</div>

  </main>
    </div>
  );
};

  return null;
}

export default function Page() {
  return (
    <Providers>
      <DashboardPage1 />
    </Providers>
  );
}
