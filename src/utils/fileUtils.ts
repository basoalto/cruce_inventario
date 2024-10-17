
import * as XLSX from 'xlsx';

export const exportAllToXLSX = (data: any[]) => {
  if (!data || data.length === 0) return;

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Datos");
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "datos.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
};
export const processCsvData = (jsonData: any, 
  setChartData: Function, 
  setChartData2: Function, 
  setMetrics: Function,
  stockP: string, 
  activoP: string, 
  robadoP: string,
  setChartDataType: string,
  setChartData2Type: string
) => {
    // Agrupar y contar las propiedades basadas en un campo del CSV, por ejemplo "Tipo"
    console.log('setChartDataType', setChartDataType)
    const propertyTypeCounts = jsonData.reduce((acc: Record<string, number>, row: any) => {
      const type = row[setChartDataType];  // Cambia "Tipo" por el nombre exacto de la columna
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    console.log(propertyTypeCounts)
    const propertyTypeCounts2 = jsonData.reduce((acc: Record<string, number>, row: any) => {
      const type = row[setChartData2Type];  // Cambia "Tipo" por el nombre exacto de la columna
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    console.log(propertyTypeCounts2)
    // Calcular métricas
    const total = jsonData.length;
    const stock = jsonData.filter((row: any) => row.Estado === stockP).length;
    const activo = jsonData.filter((row: any) => row.Estado === activoP).length;
    const robado = jsonData.filter((row: any) => row.Estado === robadoP).length;
    setMetrics({ total, stock, activo, robado });
    
    // Configurar los datos para el gráfico de torta
    setChartData({
      labels: Object.keys(propertyTypeCounts),
      datasets: [
        {
          label: 'Cantidad de Propiedades',
          data: Object.values(propertyTypeCounts),
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    });

    setChartData2({
      labels: Object.keys(propertyTypeCounts2),
      datasets: [
        {
          label: 'Cantidad por Empresa',
          data: Object.values(propertyTypeCounts2),
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ],
    });
}