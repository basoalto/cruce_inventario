// src/components/MainContent.tsx
import React from "react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import MetricsSection from "../Table/MetricsSection";
import PieChartContainer from "../Chart/PieChartContainer";
import InventoryTable from "../Table/InventoryTable";

interface MainContentProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  metrics: any;
  chartData: any;
  chartData2: any;
  rowData: any[];  // Updated type for the table data
  columnDefs: any[];  // Updated type for the column definitions
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileExport: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  darkMode,
  toggleDarkMode,
  metrics,
  chartData,
  chartData2,
  rowData,  // Use rowData instead of csvData
  columnDefs,  // Use columnDefs instead of columns
  handleFileUpload,
  handleFileExport,
}) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex justify-center p-5">
          <div className="max-w-5xl w-full mt-8">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {/* Metrics Section */}
            <MetricsSection metrics={metrics} />
            {/* Pie Charts */}
            <div className="flex flex-col lg:flex-row justify-between py-5 gap-5">
              <PieChartContainer data={chartData} title="Distribución por Tipo" />
              <PieChartContainer data={chartData2} title="Distribución de Inventario por Empresa" />
            </div>
            {/* Inventory Table */}
            <InventoryTable
              rowData={rowData}  // Updated prop name
              columnDefs={columnDefs}  // Updated prop name
              onFileUpload={handleFileUpload}
              onFileExport={handleFileExport}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
