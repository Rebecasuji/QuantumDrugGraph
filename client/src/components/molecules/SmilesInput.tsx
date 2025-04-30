import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { smilesInputSchema } from "@shared/schema";

interface SmilesInputProps {
  onSmilesChange: (smiles: string) => void;
}

// Example SMILES strings for common drugs
const EXAMPLE_SMILES = [
  { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C" },
  { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
  { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O" },
  { name: "Paracetamol", smiles: "CC(=O)NC1=CC=C(C=C1)O" }
];

export default function SmilesInput({ onSmilesChange }: SmilesInputProps) {
  const [smiles, setSmiles] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const { toast } = useToast();

  const validateSmiles = (input: string): boolean => {
    try {
      smilesInputSchema.parse({ smiles: input });
      setIsValid(true);
      return true;
    } catch (error) {
      setIsValid(false);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setSmiles(value);
    
    // Don't show validation errors while typing, only when submitting
    if (value === "") {
      setIsValid(true);
    }
  };

  const handleSubmit = () => {
    if (validateSmiles(smiles)) {
      onSmilesChange(smiles);
      toast({
        title: "SMILES input accepted",
        description: "The molecular structure has been processed.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid SMILES notation",
        description: "Please enter a valid SMILES string.",
      });
    }
  };

  const handleExampleClick = (exampleSmiles: string) => {
    setSmiles(exampleSmiles);
    validateSmiles(exampleSmiles);
    onSmilesChange(exampleSmiles);
    setShowExamples(false);
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Enter SMILES String</h3>
      <p className="mt-1 text-sm text-gray-500">
        Input the SMILES representation of your molecule.
      </p>
      
      <div className="mt-3">
        <Textarea
          id="smiles"
          value={smiles}
          onChange={handleInputChange}
          rows={4}
          className={`font-mono ${!isValid ? 'border-red-500' : ''}`}
          placeholder="e.g., CN1C=NC2=C1C(=O)N(C(=O)N2C)C"
        />
      </div>
      
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <span>Enter valid SMILES notation</span>
        <Button 
          variant="link" 
          className="p-0 h-auto font-medium text-primary hover:text-blue-500"
          onClick={() => setShowExamples(!showExamples)}
        >
          Examples
        </Button>
      </div>
      
      {showExamples && (
        <Card className="mt-2">
          <CardContent className="p-3">
            <ul className="space-y-2">
              {EXAMPLE_SMILES.map((example) => (
                <li key={example.name}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left"
                    onClick={() => handleExampleClick(example.smiles)}
                  >
                    <span className="font-medium">{example.name}:</span>
                    <span className="ml-2 font-mono text-sm truncate">{example.smiles}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!smiles}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
