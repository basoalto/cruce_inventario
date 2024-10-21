"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Providers from "../../../components/Providers";
import Navbar from "@/components/Navbar";
import { read, utils } from 'xlsx';  // Librería para procesar archivos CSV/Excel
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { exportAllToXLSX } from "@/utils/fileUtils";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import { openDatabase, saveCsvData, loadDataAndProcess } from "@/utils/database"; // Asegúrate de importar correctamente
import MetricsSection from "@/components/Table/MetricsSection";
import PieChartContainer from "@/components/Chart/PieChartContainer";
import CityMap from "@/components/Chart/map";
import Sidebar from "@/components/sideBar/SidebardShare";
import NavbarInventory from "@/components/layout/NavBarInventory";
import TreemapSystemOperative  from "@/components/Chart/treemapOperative";

import FileUploadButtons from "@/components/Table/FileUploadButtons";
import InventoryTable from "@/components/Table/InventoriesTable";
import { Bar } from 'react-chartjs-2'; 
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,BarElement);
interface CityData {
  name: string;
  count: number; // Cambia 'unknown' a 'number' si 'count' es un número
  latitude: number | null;
  longitude: number | null;
}
function DashboardPage1() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");  const { data: session, status } = useSession();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [chartDataBarra, setChartDataBarra] = useState<any>({
    labels: [],
    datasets: [{
      label: 'Cantidad por Zona',
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }],
  });
  const [cityData, setCityData] = useState<CityData[]>([]); // Especificamos el tipo aquí
  const [loadingCSV, setLoadingCSV] = useState(true); // Track CSV data loading
  const [metrics, setMetrics] = useState({ total: 0, stock: 0, activo: 0, robado: 0 });
  const [columns, setColumns] = useState<any[]>([]);

  const [treemapData, setTreemapData] = useState([]);

  const cities = [
    { name: "Santiago", latitude: -33.4372, longitude: -70.6506 },
    { name: "Concepción", latitude: -36.8282, longitude: -73.0514 },
    { name: "Puente Alto", latitude: -33.6167, longitude: -70.5667 },
    { name: "Maipú", latitude: -33.5167, longitude: -70.7667 },
    { name: "La Florida", latitude: -33.5333, longitude: -70.5833 },
    { name: "Antofagasta", latitude: -23.6500, longitude: -70.4000 },
    { name: "Viña del Mar", latitude: -33.0244, longitude: -71.5517 },
    { name: "San Bernardo", latitude: -33.5833, longitude: -70.7000 },
    { name: "Valparaíso", latitude: -33.0461, longitude: -71.6197 },
    { name: "Temuco", latitude: -38.7333, longitude: -72.6667 },
    { name: "La Serena", latitude: -29.9000, longitude: -71.2500 },
    { name: "Iquique", latitude: -20.2167, longitude: -70.1500 },
    { name: "Calama", latitude: -22.4667, longitude: -68.9333 },
    { name: "Antofagasta K1 -K3", latitude: -23.6500, longitude: -70.4000 },
    { name: "Curicó", latitude: -34.9833, longitude: -71.2333 },
    { name: "Coyhaique", latitude: -45.5667, longitude: -72.0667 },
    { name: "Linares", latitude: -35.8500, longitude: -71.6000 },
    { name: "Talca", latitude: -35.4269, longitude: -71.6656 },
    { name: "Los Ángeles", latitude: -37.4667, longitude: -72.3500 },
    { name: "Rancagua", latitude: -34.1667, longitude: -70.7500 },
    { name: "Punta Arenas", latitude: -53.1667, longitude: -70.9333 },
    { name: "Chillán", latitude: -36.6000, longitude: -72.1167 },
    { name: "Valdivia", latitude: -39.8139, longitude: -73.2458 },
    { name: "Copiapó", latitude: -27.3664, longitude: -70.3331 },
    { name: "Osorno", latitude: -40.5725, longitude: -73.1353 },
    { name: "Chañaral", latitude: -26.3444, longitude: -70.6219 },
    { name: "Lebu", latitude: -37.6000, longitude: -73.6667 },
    { name: "Coquimbo", latitude: -29.9531, longitude: -71.3433 },
    { name: "Puerto Montt", latitude: -41.4667, longitude: -72.9333 },
    { name: "Puerto Natales", latitude: -51.7333, longitude: -72.5167 },
    { name: "Viña del Mar", latitude: -33.0244, longitude: -71.5517 },
    { name: "Angol", latitude: -37.8000, longitude: -72.7167 },
    { name: "Hanga Roa", latitude: -27.1333, longitude: -109.4167 },
    { name: "Tocopilla", latitude: -22.0964, longitude: -70.2000 },
    { name: "Putre", latitude: -18.1969, longitude: -69.5594 },
    { name: "Illapel", latitude: -31.6333, longitude: -71.1667 },
    { name: "Quillota", latitude: -32.8667, longitude: -71.2500 },
    { name: "San Felipe", latitude: -32.7500, longitude: -70.7239 },
    { name: "Colina", latitude: -33.2017, longitude: -70.6703 },
    { name: "Pichilemu", latitude: -34.3919, longitude: -72.0139 },
    { name: "Porvenir", latitude: -53.2833, longitude: -70.3667 },
    { name: "Cochrane", latitude: -47.2547, longitude: -72.5750 },
    { name: "Coyhaique", latitude: -45.5667, longitude: -72.0667 },
    { name: "Puerto Williams", latitude: -54.9333, longitude: -67.6167 },
]
  useEffect(() => {
    // Combina la información de ciudades y la cantidad de servicios por zona
    if(chartDataBarra){
      console.log('chartDataBarra', chartDataBarra)
      const combinedData = Object.entries(chartDataBarra).map(([zone, count]) => {
        const cityInfo = cities.find(city => city.name.toLowerCase() === zone.toLowerCase());
        return {
            name: zone,
            count: count,
            latitude: cityInfo ? cityInfo.latitude : null,
            longitude: cityInfo ? cityInfo.longitude : null,
        };
        });

        // Filtrar las ciudades que no tienen coordenadas
        const filteredCityData:any = combinedData.filter(city => city.latitude !== null && city.longitude !== null);
        console.log('filteredCityData', filteredCityData)
        // Actualiza el estado con los datos filtrados
        setCityData(filteredCityData);
    }

}, []); // Se ejecuta una vez al montar el componente
  useEffect(() => {
    if(chartDataBarra){
      console.log('chartDataBarra', chartDataBarra)
    }
  });

  useEffect(() => {
    // if (status === "unauthenticated") {
    //   signIn();
    // }
    loadDataAndProcess(25, 'csvStore4', setCsvData, setChartData, setChartData2, setMetrics, 'Activo','Stock', 'Robado', 'Tipo', 'Sistema operativo');
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


  const processTreemapData = (jsonData: any[]) => {
    // Agrupar los datos por sucursal y estado
    const groupedData = jsonData.reduce((acc, item) => {
      const sucursal = item.Sucursal || 'Sucursal Desconocida';
      const estado = item["Estado Actual"] || 'Desconocido';
  
      // Si no existe la sucursal, inicialízala
      if (!acc[sucursal]) {
        acc[sucursal] = {
          totalCount: 0,    // Contador total de elementos
          modelos: {}
        };
      }
  
      // Incrementa el contador para el total de la sucursal
      acc[sucursal].totalCount += 1;
  
      // Si el modelo no existe, inicialízalo
      if (!acc[sucursal].modelos[estado]) {
        acc[sucursal].modelos[estado] = 0;
      }
      acc[sucursal].modelos[estado] += 1;
  
      return acc; // Devuelve el acumulador para la siguiente iteración
    }, {});
    return groupedData;
  };
  
  const getThirdObject = async () => {
    try {
      const db: any = await openDatabase('csvStore4'); 
  
      const transaction = db.transaction("csvStore4", "readonly"); 
      const store = transaction.objectStore("csvStore4"); 
  
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
        const sheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData: any = utils.sheet_to_json(sheet);

        if(jsonData.length > 0){
          const dinamyc  = Object.keys(jsonData[0]).map(data => ({
            headername: data,
            field: data
          }))
          setColumns(dinamyc)
        }

        // Procesar los datos para el gráfico de árbol
        const treemapProcessedData: any = processTreemapData(jsonData);  // Define cómo procesar los datos para el gráfico
        console.log('treemapProcessedData', treemapProcessedData)
        setTreemapData(treemapProcessedData);

        // Agrupación por zona
        // const groupedByZone: any = jsonData.reduce((acc: any, item: any) => {
        //   const location = item.Localización;
        //   const parts = location.split('/');
        //   if (parts.length > 3) {
        //     const zone = parts[3];
        //     if (!acc[zone]) {
        //       acc[zone] = 0; // Inicializa el contador
        //     }
        //     acc[zone] += 1; // Incrementa el contador
        //   }
        //   return acc;
        // }, {});
        // console.log('groupedByZone', groupedByZone)

        // // Preparar datos para el gráfico
        // const chartLabels = Object.keys(groupedByZone);
        // const chartValues = Object.values(groupedByZone);
        // setChartDataBarra({
        //   labels: chartLabels,
        //   datasets: [{
        //     label: 'Cantidad por Zona',
        //     data: chartValues,
        //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        //   }],
        // });



        setCsvData(jsonData);
        setLoadingCSV(false);
        saveCsvData(25, jsonData,'csvStore4',setCsvData,setChartData,setChartData2,setMetrics, 'Activo','Stock', 'Robado', 'Tipo', 'Sistema operativo')
      };
      reader.readAsArrayBuffer(file);
    }else{
      console.log('error')
    }
  };
  
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  // if (session) {
    return (
<div className="flex bg-white dark:bg-gray-900 h-full"> {/* Contenedor principal */}
  {/* Sidebar */}
  <Sidebar />

  {/* Contenedor principal */}
  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full"> {/* Manteniendo h-full para el contenedor principal */}


    {/* header */}
    <NavbarInventory title="Inventario de Activos" />

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
        {/* Gráficos de Tree */}
        <div className="mb-3 pb-5">
          <TreemapSystemOperative data={treemapData} title="Recuento de Estado por Sucursal" />
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

  // return null;
// }

export default function Page() {
  return (
    <Providers>
      <DashboardPage1 />
    </Providers>
  );
}
