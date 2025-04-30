import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PropertyData {
  name: string;
  value: string | number;
  score: number;
  confidence: number;
  color?: string;
}

interface PropertyPredictionProps {
  properties: PropertyData[];
  className?: string;
}

export default function PropertyPrediction({ properties, className }: PropertyPredictionProps) {
  // Helper to determine text color based on property
  const getValueColor = (name: string, value: string | number) => {
    if (name.toLowerCase().includes("toxicity")) {
      return typeof value === "string" && value.toLowerCase() === "low" 
        ? "text-green-600"
        : "text-red-600";
    }
    
    if (name.toLowerCase().includes("binding")) {
      return "text-primary";
    }
    
    if (name.toLowerCase().includes("permeability")) {
      return "text-accent";
    }
    
    if (name.toLowerCase().includes("solubility")) {
      return "text-amber-600";
    }
    
    return "text-gray-700";
  };

  // Helper to determine progress bar color
  const getProgressColor = (name: string, score: number) => {
    if (name.toLowerCase().includes("toxicity")) {
      return "bg-green-500";
    }
    
    if (name.toLowerCase().includes("binding")) {
      return "bg-primary";
    }
    
    if (name.toLowerCase().includes("permeability")) {
      return "bg-accent";
    }
    
    if (name.toLowerCase().includes("solubility")) {
      return "bg-amber-500";
    }
    
    return "bg-primary";
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <h4 className="text-base font-medium text-gray-900 mb-4">Predicted Properties</h4>
        <div className="space-y-4">
          {properties.map((property, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{property.name}</span>
                <span className={cn("text-sm font-medium", getValueColor(property.name, property.value))}>
                  {property.value}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={cn("h-2 rounded-full", property.color || getProgressColor(property.name, property.score))} 
                  style={{ width: `${property.score * 100}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Confidence: {property.confidence}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
