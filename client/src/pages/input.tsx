import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/molecules/FileUpload";
import SmilesInput from "@/components/molecules/SmilesInput";
import AnalysisParameters from "@/components/molecules/AnalysisParameters";
import MoleculeViewer from "@/components/visualization/MoleculeViewer";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { analysisParametersSchema } from "@shared/schema";

export default function InputPage() {
  const [file, setFile] = useState<File | null>(null);
  const [smiles, setSmiles] = useState<string>("");
  const [parameters, setParameters] = useState<z.infer<typeof analysisParametersSchema>>({
    model_type: "GNN",
    prediction_type: "Binding Affinity",
    quantum_depth: "Medium (3-5 layers)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // In a real implementation, we would extract SMILES from the file
    // For demo purposes, we'll set a placeholder SMILES
    setSmiles("CN1C=NC2=C1C(=O)N(C(=O)N2C)C");
  };

  const handleSmilesChange = (inputSmiles: string) => {
    setSmiles(inputSmiles);
    setFile(null); // Clear file when SMILES is entered manually
  };

  const handleParametersChange = (values: z.infer<typeof analysisParametersSchema>) => {
    setParameters(values);
  };

  const handleReset = () => {
    setFile(null);
    setSmiles("");
    setParameters({
      model_type: "GNN",
      prediction_type: "Binding Affinity",
      quantum_depth: "Medium (3-5 layers)",
    });
  };

  const handleSubmit = async () => {
    if (!smiles) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please upload a file or enter SMILES string.",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // First create the molecule
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("smiles", smiles);
      formData.append("name", file ? file.name.split('.')[0] : "Molecule");
      
      const moleculeResponse = await fetch("/api/molecules", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!moleculeResponse.ok) {
        throw new Error("Failed to process molecule");
      }
      
      const molecule = await moleculeResponse.json();
      
      // Then create the analysis
      const analysisResponse = await apiRequest("POST", "/api/analyses", {
        molecule_id: molecule.id,
        model_type: parameters.model_type,
        prediction_type: parameters.prediction_type,
        quantum_depth: parameters.quantum_depth,
      });
      
      if (!analysisResponse.ok) {
        throw new Error("Failed to process analysis");
      }
      
      const analysis = await analysisResponse.json();
      
      toast({
        title: "Analysis complete",
        description: "Redirecting to results page...",
      });
      
      // Navigate to the results page
      setLocation(`/results/${analysis.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: (error as Error).message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Molecular Data Input
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Submit molecular structures for analysis through our quantum-enhanced GNN model
        </p>
      </div>

      <Card className="mt-10 sm:mt-12">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 lg:grid-cols-2">
            {/* Left Column: File Upload */}
            <div className="border-b border-gray-200 pb-6 lg:border-b-0 lg:border-r lg:pr-6">
              <FileUpload onFileSelect={handleFileSelect} />
              <div className="mt-4">
                <MoleculeViewer 
                  smiles={file ? smiles : undefined} 
                  type="3d" 
                />
              </div>
            </div>

            {/* Right Column: SMILES Input */}
            <div className="lg:pl-6">
              <SmilesInput onSmilesChange={handleSmilesChange} />
              <div className="mt-4">
                <MoleculeViewer 
                  smiles={!file ? smiles : undefined} 
                  type="2d" 
                  emptyMessage="Enter SMILES to generate preview"
                />
              </div>
            </div>
          </div>

          <AnalysisParameters onParametersChange={handleParametersChange} />

          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button 
              className="ml-3" 
              onClick={handleSubmit}
              disabled={!smiles || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Run Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
