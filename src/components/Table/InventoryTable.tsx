
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaFileImport, FaFileExport } from 'react-icons/fa';

interface InventoryTableProps {
  rowData: any[];
  columnDefs: any[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileExport: () => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ rowData, columnDefs, onFileUpload, onFileExport }) => (
  <div className="w-full p-5 border border-gray-300 dark:border-gray-700 shadow rounded mb-5">
    <div className="flex justify-between items-center mb-5">
      <h3 className="text-left">Detalle Inventario</h3>
      <div className="flex items-center space-x-5">
        <FaFileImport className="text-4xl cursor-pointer" onClick={() => document.getElementById('csvInput')?.click()} />
        <input type="file" id="csvInput" accept=".csv,.xlsx,.xls" onChange={onFileUpload} className="hidden" />
        <FaFileExport className="text-4xl cursor-pointer" onClick={onFileExport} />
      </div>
    </div>
    <div className="ag-theme-alpine" style={{ height: '300px' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
    </div>
  </div>
);

export default InventoryTable;
