import { Card, CardContent } from "@/components/ui/card";
import ChartDisplay from "@/components/visualization/ChartDisplay";

interface QuantumAnalysisProps {
  improvementPercentage: number;
  circuitDepth: number;
  qubits: number;
}

export default function QuantumAnalysis({ 
  improvementPercentage, 
  circuitDepth,
  qubits
}: QuantumAnalysisProps) {
  // Prepare data for the performance comparison chart
  const performanceData = [
    { name: 'Classical', value: 100 - improvementPercentage, fill: 'hsl(var(--chart-1))' },
    { name: 'Quantum', value: 100, fill: 'hsl(var(--chart-2))' }
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h4 className="text-base font-medium text-gray-900 mb-4">Quantum Enhancement Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ChartDisplay 
              title="Performance Comparison" 
              type="bar" 
              data={performanceData}
            />
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Quantum model shows <span className="text-primary font-medium">{improvementPercentage}% improved accuracy</span> for this molecule class compared to classical GNN.
              </p>
            </div>
          </div>
          
          <div>
            <ChartDisplay 
              title="Quantum Circuit Utilization" 
              type="pie"
              data={[
                { name: 'Feature Embedding', value: 40, fill: 'hsl(var(--chart-1))' },
                { name: 'Quantum Processing', value: 35, fill: 'hsl(var(--chart-2))' },
                { name: 'Measurement', value: 25, fill: 'hsl(var(--chart-3))' }
              ]}
            />
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Circuit depth: {circuitDepth} layers with {qubits} qubits utilized for molecular feature embedding.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
