// src/components/MainContent.tsx
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import MetricsSection from "../Table/MetricsSection";
import PieChartContainer from "../Chart/PieChartContainer";
import FileUploadButtons from "../Table/FileUploadButtons";
import InventoryTable from "../Table/InventoryTable";

const MainContent = ({ darkMode, toggleDarkMode, metrics, chartData, chartData2, csvData, columns, handleFileUpload, handleFileExport }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex justify-center p-5">
          <div className="max-w-5xl w-full mt-8">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {/* Sección de métricas */}
            <MetricsSection metrics={metrics} />
            {/* Gráficos de torta */}
            <div className="flex flex-col lg:flex-row justify-between py-5 gap-5">
              <PieChartContainer data={chartData} title="Distribución por Tipo" />
              <PieChartContainer data={chartData2} title="Distribución de Inventario por Empresa" />
            </div>
            {/* Tabla con ag-Grid */}
            <div className="w-full p-5 border border-gray-300 dark:border-gray-700 shadow rounded mb-5">
              {/* <div className="flex justify-between items-center mb-5">
                <h3 className="text-left">Detalle Inventario</h3>
                <FileUploadButtons handleFileUpload={handleFileUpload} handleFileExport={handleFileExport} />
              </div> */}
              <InventoryTable csvData={csvData} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
