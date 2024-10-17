import MetricsCard from "../Chart/MetricsCard";

interface MetricsSectionProps {
  metrics: {
    total: number;
    stock: number;
    activo: number;
    robado: number;
  };
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ metrics }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
    <MetricsCard label="Total Inventario" value={metrics.total}  />
    <MetricsCard label="Total Stock" value={metrics.stock}  />
    <MetricsCard label="Total Activo" value={metrics.activo}  />
    <MetricsCard label="Total Robado" value={metrics.robado}  />
  </div>
);

export default MetricsSection;
