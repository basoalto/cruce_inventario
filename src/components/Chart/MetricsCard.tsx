"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MetricsCardProps {
  label: string;
  value: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ label, value }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
      <CardTitle className="text-sm font-medium">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">Cantidad del último mes</p>
    </CardContent>
  </Card>
);

export default MetricsCard;
