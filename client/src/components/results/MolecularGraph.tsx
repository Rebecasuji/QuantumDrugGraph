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
              { name: 'Aromatic', value: 85, fill: '#1A936F' },       // Green
              { name: 'Hydrogen Bond', value: 62, fill: '#E76F51' },  // Orange 
              { name: 'Hydrophobic', value: 73, fill: '#00BBF9' },    // Sky Blue
              { name: 'Ring Structure', value: 91, fill: '#F15BB5' }  // Pink
            ]}
          />
          
          <ChartDisplay 
            title="Substructure Contributions" 
            type="pie"
            data={[
              { name: 'Core', value: 65, fill: '#9B5DE5' },          // Lavender
              { name: 'Functional Groups', value: 35, fill: '#F15BB5' } // Pink
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
