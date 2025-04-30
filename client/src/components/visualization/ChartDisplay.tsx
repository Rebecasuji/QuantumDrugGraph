import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, PieChart as PieChartIcon, Share, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

interface ChartDisplayProps {
  title: string;
  type: 'bar' | 'pie' | 'network';
  data?: ChartData[];
  emptyMessage?: string;
  className?: string;
}

export default function ChartDisplay({
  title,
  type,
  data,
  emptyMessage = "No data available",
  className
}: ChartDisplayProps) {
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
  
  // Generate some placeholder data if none provided
  const placeholderData = [
    { name: 'Classical', value: 66, fill: COLORS[0] },
    { name: 'Quantum', value: 100, fill: COLORS[1] },
  ];

  const chartData = data || placeholderData;

  const renderChart = () => {
    if (!data) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          {type === 'bar' && <BarChart3 className="h-12 w-12 text-gray-400" />}
          {type === 'pie' && <PieChartIcon className="h-12 w-12 text-gray-400" />}
          {type === 'network' && <Share className="h-12 w-12 text-gray-400" />}
          <p className="mt-2 text-sm text-gray-500">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{emptyMessage}</p>
        </div>
      );
    }

    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    // Network visualization placeholder
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Share className="h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">{title}</p>
      </div>
    );
  };

  return (
    <Card className={cn("h-[280px]", className)}>
      <CardContent className="p-4 h-full">
        <h5 className="text-sm font-medium text-gray-700 mb-3">{title}</h5>
        <div className="h-[220px]">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}
