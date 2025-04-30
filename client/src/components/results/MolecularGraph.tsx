import { Card, CardContent } from "@/components/ui/card";
import ChartDisplay from "@/components/visualization/ChartDisplay";

export default function MolecularGraph() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h4 className="text-base font-medium text-gray-900 mb-4">Molecular Graph Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartDisplay 
            title="GNN Feature Importance" 
            type="bar"
            data={[
              { name: 'Aromatic', value: 85, fill: 'hsl(var(--chart-1))' },
              { name: 'Hydrogen Bond', value: 62, fill: 'hsl(var(--chart-2))' },
              { name: 'Hydrophobic', value: 73, fill: 'hsl(var(--chart-3))' },
              { name: 'Ring Structure', value: 91, fill: 'hsl(var(--chart-4))' }
            ]}
          />
          
          <ChartDisplay 
            title="Substructure Contributions" 
            type="pie"
            data={[
              { name: 'Core', value: 65, fill: 'hsl(var(--chart-2))' },
              { name: 'Functional Groups', value: 35, fill: 'hsl(var(--chart-3))' }
            ]}
          />
          
          <ChartDisplay 
            title="Similar Compounds" 
            type="network"
          />
        </div>
      </CardContent>
    </Card>
  );
}
