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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
    <MetricsCard label="Total Inventario" value={metrics.total}  />
  </div>
);

export default MetricsSection;
