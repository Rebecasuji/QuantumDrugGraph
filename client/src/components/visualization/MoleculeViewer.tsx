import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Box, Rotate3d, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MoleculeViewerProps {
  smiles?: string;
  type: "3d" | "2d";
  showControls?: boolean;
  className?: string;
  emptyMessage?: string;
}

export default function MoleculeViewer({
  smiles,
  type,
  showControls = false,
  className,
  emptyMessage = "Upload a file or enter SMILES to preview"
}: MoleculeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smiles || !containerRef.current) return;

    // In a real implementation, we would use a library like 3DMol.js
    // to render the molecule based on the SMILES string
    
    // For this example, we're just showing a placeholder
    const container = containerRef.current;

    // Clean up function
    return () => {
      // Cleanup any 3D viewer instance
    };
  }, [smiles, type]);

  if (!smiles) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-4 h-[300px] flex flex-col items-center justify-center text-center">
          {type === "3d" ? (
            <Box className="h-12 w-12 text-gray-400 mb-2" />
          ) : (
            <Share2 className="h-12 w-12 text-gray-400 mb-2" />
          )}
          <p className="mt-2 text-sm text-gray-500">
            {type === "3d" ? "3D Molecule Visualization" : "2D Structure Preview"}
          </p>
          <p className="text-xs text-gray-400">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div 
          ref={containerRef} 
          className="h-[250px] w-full flex items-center justify-center"
        >
          {/* 3D/2D viewer will be initialized here */}
          <div className="text-center">
            {type === "3d" ? (
              <img 
                src="https://cdn.rcsb.org/images/structures/cf/1cfd/1cfd_assembly-1.jpeg" 
                alt="Molecular visualization" 
                className="max-h-full mx-auto rounded"
              />
            ) : (
              <img 
                src="https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2519&t=l" 
                alt="Molecular structure" 
                className="max-h-full mx-auto rounded"
              />
            )}
          </div>
        </div>
        
        {showControls && (
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="outline" size="sm" className="h-8">
              <Rotate3d className="h-4 w-4 mr-1" />
              Rotate
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Box className="h-4 w-4 mr-1" />
              Ball & Stick
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
