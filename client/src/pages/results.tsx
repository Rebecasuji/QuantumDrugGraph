import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Save, Share2, RefreshCw } from "lucide-react";
import MoleculeViewer from "@/components/visualization/MoleculeViewer";
import PropertyPrediction from "@/components/results/PropertyPrediction";
import QuantumAnalysis from "@/components/results/QuantumAnalysis";
import MolecularGraph from "@/components/results/MolecularGraph";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPage() {
  const { id } = useParams();
  const analysisId = parseInt(id as string);

  // Fetch analysis data
  const { data: analysis, isLoading: analysisLoading } = useQuery({
    queryKey: [`/api/analyses/${analysisId}`],
    enabled: !isNaN(analysisId),
  });

  // Fetch molecule data based on analysis
  const { data: molecule, isLoading: moleculeLoading } = useQuery({
    queryKey: [`/api/molecules/${analysis?.molecule_id}`],
    enabled: !!analysis?.molecule_id,
  });

  const isLoading = analysisLoading || moleculeLoading;

  // Process prediction properties
  const getPredictionProperties = () => {
    if (!analysis?.results) return [];
    
    const { binding_affinity, bbb_permeability, toxicity_risk, solubility } = analysis.results;
    
    return [
      {
        name: "Binding Affinity (Adenosine A2a Receptor)",
        value: `${binding_affinity.value} pKi`,
        score: binding_affinity.value / 10,
        confidence: binding_affinity.confidence,
      },
      {
        name: "Blood-Brain Barrier Permeability",
        value: bbb_permeability.value,
        score: bbb_permeability.score,
        confidence: bbb_permeability.confidence,
      },
      {
        name: "Toxicity Risk",
        value: toxicity_risk.value,
        score: toxicity_risk.score,
        confidence: toxicity_risk.confidence,
      },
      {
        name: "Solubility (LogS)",
        value: solubility.value,
        score: solubility.score,
        confidence: solubility.confidence,
      },
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Analysis Results
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Quantum-enhanced GNN predictions for your molecule
        </p>
      </div>

      <Card className="mt-10">
        <CardHeader className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {isLoading ? (
            <>
              <div>
                <Skeleton className="h-5 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-32 mt-2 sm:mt-0" />
            </>
          ) : (
            <>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {molecule?.name || "Unnamed Molecule"}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 font-mono">
                  SMILES: {molecule?.smiles?.length > 40 
                    ? `${molecule?.smiles?.substring(0, 40)}...` 
                    : molecule?.smiles}
                </p>
              </div>
              <Badge variant="success" className="flex items-center mt-2 sm:mt-0">
                <CheckCircle className="h-4 w-4 mr-1" />
                Analysis Complete
              </Badge>
            </>
          )}
        </CardHeader>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* 3D Visualization */}
            <div className="px-4 py-5 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200">
              <h4 className="text-base font-medium text-gray-900 mb-4">Molecular Structure</h4>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <MoleculeViewer 
                  smiles={molecule?.smiles} 
                  type="3d" 
                  showControls 
                />
              )}
            </div>

            {/* Property Predictions */}
            <div className="px-4 py-5 sm:p-6">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : (
                <PropertyPrediction properties={getPredictionProperties()} />
              )}
            </div>
          </div>
        </div>

        {/* Quantum Enhancement Analysis */}
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-4 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[280px] w-full" />
                <Skeleton className="h-[280px] w-full" />
              </div>
            </div>
          ) : (
            <QuantumAnalysis 
              improvementPercentage={analysis?.results?.quantum_enhancement?.improvement || 30}
              circuitDepth={analysis?.results?.quantum_enhancement?.circuit_depth || 4}
              qubits={analysis?.results?.quantum_enhancement?.qubits || 8}
            />
          )}
        </div>

        {/* Molecular Graph Analysis */}
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-4 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-[280px] w-full" />
                <Skeleton className="h-[280px] w-full" />
                <Skeleton className="h-[280px] w-full" />
              </div>
            </div>
          ) : (
            <MolecularGraph />
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="space-x-3">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save Results
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          <Link href="/input">
            <Button>
              <RefreshCw className="h-4 w-4 mr-1" />
              Run New Analysis
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
