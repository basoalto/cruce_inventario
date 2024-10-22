"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Providers from "../../../components/Providers";
import Sidebar from "@/components/sideBar/SidebardShare";
import Header from "@/components/layout/Header";
import MainContent from "@/components/layout/MainContent";
import NavbarInventory from "@/components/layout/NavBarInventory";

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { read, utils } from 'xlsx';  // Librería para procesar archivos CSV/Excel
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { exportAllToXLSX } from "@/utils/fileUtils";
import { openDatabase, saveCsvData, loadDataAndProcess } from "@/utils/database"; // Asegúrate de importar correctamente


import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import MetricsSection from "@/components/Table/MetricsSection";
import PieChartContainer from "@/components/Chart/PieChartContainer";
import FileUploadButtons from "@/components/Table/FileUploadButtons";
import InventoryTable from "@/components/Table/InventoriesTable";


Chart.register(ArcElement, Tooltip, Legend);

function DashboardPage1() {
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Controla la visibilidad del Sidebar
  const [darkMode, setDarkMode] = useState(false);  // Default value as false
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(savedDarkMode);
    }
  }, []);  // Only runs on the client
  // const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");  
  const { data: session, status } = useSession();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [filteredChartD, setFilteredChartData] = useState<any>([]);  // Nuevo chartData filtrado por categorías
  const [treemapData, setTreemapData] = useState([]);

  const [loadingCSV, setLoadingCSV] = useState(true); // Track CSV data loading
  const [metrics, setMetrics] = useState({ total: 0, stock: 0, activo: 0, robado: 0 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Estado para checkboxes
  
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    if (chartData) { // Verifica que chartData no sea null
      const transformedData = chartData.labels.map((label: string, index: number) => ({
        name: label,
        value: chartData.datasets[0].data[index],
      }));

      setTreemapData(transformedData);
    }
  }, [chartData]); // Se ejecuta cada vez que chartData cambia
  
  // Extrae y prepara los datos para chartData a partir de la columna "Tipo"
  useEffect(() => {
    if (csvData.length > 0) {
      console.log('Datos CSV:', csvData);
      const tipoCounts = csvData.reduce((acc: any, item: any) => {
        const tipo = item["Tipo"];
        if (!acc[tipo]) {
          acc[tipo] = 0;
        }
        acc[tipo]++;
        return acc;
      }, {});

      const newChartData = Object.keys(tipoCounts).map(tipo => ({
        label: tipo,
        count: tipoCounts[tipo]
      }));
      console.log('newChartData', newChartData)
      setFilteredChartData(newChartData);
    }
  }, [csvData]);
  useEffect(() => {
    console.log('chartData:', chartData);  // Agrega este log
  }, [chartData]);
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
    console.log("Cargando datos...");
    loadDataAndProcess(32, 'csvStore1', setCsvData, setChartData, setChartData2, setMetrics, 'ACTIVO', 'STOCK', 'ROBADO', 'Tipo', 'Propiedad_actual');
  }, [status]);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);
  // Verificar si chartData es un array antes de filtrar
  const filteredChartData = Array.isArray(chartData)
    ? chartData.filter((data: any) => selectedCategories.includes(data.label))
    : [];

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode); // Cambiar el estado
  };
  
  const getThirdObject = async () => {
    try {
      const db: any = await openDatabase('csvStore1'); 
  
      const transaction = db.transaction("csvStore1", "readonly"); 
      const store = transaction.objectStore("csvStore1"); 
  
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('e', e)
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData:any = utils.sheet_to_json(sheet);    

        if(jsonData.length > 0){
          const dynamic = Object.keys(jsonData[0]).map((data) => ({
            headerName: data,
            field: data,
            }))
          setColumns(dynamic)
        }
        setCsvData(jsonData);
        setLoadingCSV(false);
        saveCsvData(32, jsonData,'csvStore1',setCsvData,setChartData,setChartData2,setMetrics, 'ACTIVO', 'STOCK', 'ROBADO', 'Tipo', 'Propiedad_actual')
      };
      reader.readAsArrayBuffer(file);
    }else{
      console.log('error')
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategories(prevState =>
      prevState.includes(category)
        ? prevState.filter(cat => cat !== category)
        : [...prevState, category]
    );
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (session) {
    return (

<div className="flex bg-white dark:bg-gray-900 h-full"> {/* Contenedor principal */}
  {/* Sidebar */}
  <Sidebar />

  {/* Contenedor principal */}
  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full"> {/* Manteniendo h-full para el contenedor principal */}

    {/* header */}
    <NavbarInventory title="Inventario INV WEB" />

    {/* Contenedor del contenido principal */}
    <div className="flex flex-1 items-center justify-center rounded-lg border border-border dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex justify-center p-5 w-full">
        <div className="max-w-5xl w-full mt-8">
          {/* Sección de métricas */}
          <MetricsSection metrics={metrics} />

          {/* Gráficos de torta */}
          <div className="flex flex-col lg:flex-row justify-between py-5 gap-5">
            <PieChartContainer data={chartData} title="Distribución por Tipo" />
            <PieChartContainer
              data={chartData2}
              title="Distribución de Inventario por Empresa"
            />
          </div>

          {/* Tabla con ag-Grid */}
          <div className="w-full p-5 border dark:border-gray-700 shadow rounded bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-left text-secondary dark:text-gray-300">
                Detalle Inventario
              </h3>
              <FileUploadButtons
                handleFileUpload={handleFileUpload}
                handleFileExport={handleFileExport}
              />
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
  
}

export default function Page() {
  return (
    <Providers>
      <DashboardPage1 />
    </Providers>
  );
}
