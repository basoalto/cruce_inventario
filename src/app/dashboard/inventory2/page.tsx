"use client";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sideBar/SidebardShare";
import TreemapSystemOperative from "@/components/Chart/treemapOperative";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Providers from "../../../components/Providers";
import Navbar from "@/components/Navbar";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { read, utils } from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { exportAllToXLSX } from "@/utils/fileUtils";
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle";
import { openDatabase, saveCsvData, loadDataAndProcess } from "@/utils/database";
import MetricsSection from "@/components/Table/MetricsSectionInventory2";
import PieChartContainer from "@/components/Chart/PieChartContainer";
import FileUploadButtons from "@/components/Table/FileUploadButtons";
import InventoryTable from "@/components/Table/InventoriesTable";

Chart.register(ArcElement, Tooltip, Legend);

export default function Page() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const { data: session, status } = useSession();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [loadingCSV, setLoadingCSV] = useState(true);
  const [metrics, setMetrics] = useState({ total: 0, stock: 0, activo: 0, robado: 0 });
  const [columns, setColumns] = useState<any[]>([]);
  const [treemapData, setTreemapData] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
    loadDataAndProcess(32, "csvStore2", setCsvData, setChartData, setChartData2, setMetrics, "Activo", "Stock", "Robado", "Tipo", "Marca");
  }, [status]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const getThirdObject = async () => {
    try {
      const db: any = await openDatabase("csvStore2");
      const transaction = db.transaction("csvStore2", "readonly");
      const store = transaction.objectStore("csvStore2");

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
    getThirdObject();
  };

  const processTreemapData = (jsonData: any[]) => {
    const groupedData = jsonData.reduce((acc, item) => {
      const sistemaOperativo = item["Sistema operativo"] || "Desconocida";
      const modelo = item.Modelo || "Modelo Desconocido";

      if (!acc[sistemaOperativo]) {
        acc[sistemaOperativo] = { totalCount: 0, modelos: {} };
      }

      acc[sistemaOperativo].totalCount += 1;

      if (!acc[sistemaOperativo].modelos[modelo]) {
        acc[sistemaOperativo].modelos[modelo] = 0;
      }
      acc[sistemaOperativo].modelos[modelo] += 1;

      return acc;
    }, {});
    return groupedData;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[3]];
        const jsonData: any = utils.sheet_to_json(sheet);

        if (jsonData.length > 0) {
          const dynamicColumns = Object.keys(jsonData[0]).map((key) => ({
            headerName: key,
            field: key,
          }));
          setColumns(dynamicColumns);
        }
        const treemapProcessedData: any = processTreemapData(jsonData);
        setTreemapData(treemapProcessedData);

        setCsvData(jsonData);
        setLoadingCSV(false);
        saveCsvData(32, jsonData, "csvStore2", setCsvData, setChartData, setChartData2, setMetrics, "Activo", "Stock", "Robado", "Sistema operativo", "Marca");
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("error");
    }
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (session) {
    return (
      <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
        <Sidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventario Proactiva</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex justify-center p-5">
              <div className="max-w-5xl w-full mt-8">
                <MetricsSection metrics={metrics} />
                <div className="flex flex-col lg:flex-row justify-between py-5 gap-5">
                  <PieChartContainer data={chartData} title="Distribución por Sistema Operativo" />
                </div>
                <div className="mb-3 pb-5">
                  <TreemapSystemOperative data={treemapData} title="Recuento de Modelo por Sistema Operativo" />
                </div>
                <div className="w-full p-5 border border-gray-10 dark:border-gray-700 shadow rounded mb-5">
                  <div className="flex justify-between items-center mb-5">
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
  }

  return null;
}
