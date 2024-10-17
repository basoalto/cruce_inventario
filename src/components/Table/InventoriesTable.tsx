
import { AgGridReact } from 'ag-grid-react';

interface InventoryTableProps {
  csvData: any[];  // replace 'any' with proper data type
  columns: any[];  // replace 'any' with proper column definition type
}

const InventoryTable: React.FC<InventoryTableProps> = ({ csvData, columns }) => (
  <div className="ag-theme-alpine" style={{ height: '300px' }}>
    <AgGridReact
      rowData={csvData}
      columnDefs={columns}
      pagination={true}
      paginationPageSize={10}
    />
  </div>
);

export default InventoryTable;
