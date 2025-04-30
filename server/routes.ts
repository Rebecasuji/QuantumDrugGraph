import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { smilesInputSchema, analysisParametersSchema, insertMoleculeSchema, insertAnalysisSchema } from "@shared/schema";
import { nanoid } from "nanoid";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept molecular file formats
    const allowedTypes = ["chemical/x-mol", "chemical/x-pdb", "chemical/x-mdl-sdfile"];
    const allowedExtensions = [".mol", ".pdb", ".sdf"];
    
    const fileExt = file.originalname.split('.').pop()?.toLowerCase();
    if (fileExt && allowedExtensions.includes(`.${fileExt}`)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Supported formats: .mol, .pdb, .sdf"));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for molecular data
  app.post("/api/molecules", upload.single("file"), async (req, res) => {
    try {
      const fileData = req.file;
      let smiles = req.body.smiles;
      let fileFormat = null;

      // If a file was uploaded, process it to extract SMILES
      // In a real implementation, this would use RDKit or similar
      if (fileData) {
        // For demo, we just store the file format
        fileFormat = fileData.originalname.split('.').pop()?.toLowerCase();
        
        // In a real implementation, convert the file to SMILES
        // For now, just use the provided SMILES or a placeholder
        if (!smiles) {
          // This is just a placeholder. In reality, we would extract SMILES from the file
          smiles = "CC1=CC=C(C=C1)C2=CC(=NN2C3=CC=C(C=C3)S(=O)(=O)N)C(F)(F)F";
        }
      }

      // Validate SMILES input if no file
      if (!fileData && smiles) {
        try {
          smilesInputSchema.parse({ smiles });
        } catch (error) {
          return res.status(400).json({ message: "Invalid SMILES string format" });
        }
      }

      if (!smiles && !fileData) {
        return res.status(400).json({ message: "Either SMILES string or molecular file is required" });
      }

      // Create a name if none provided
      const name = req.body.name || `Molecule_${nanoid(6)}`;

      // Create molecule record
      const molecule = await storage.createMolecule({
        name,
        smiles,
        file_format: fileFormat,
        user_id: req.body.user_id || null,
      });

      res.status(201).json(molecule);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Get molecule by ID
  app.get("/api/molecules/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const molecule = await storage.getMolecule(id);
      
      if (!molecule) {
        return res.status(404).json({ message: "Molecule not found" });
      }

      res.json(molecule);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Run analysis on a molecule
  app.post("/api/analyses", async (req, res) => {
    try {
      // Validate analysis parameters
      try {
        analysisParametersSchema.parse({
          model_type: req.body.model_type,
          prediction_type: req.body.prediction_type,
          quantum_depth: req.body.quantum_depth,
        });
      } catch (error) {
        return res.status(400).json({ message: "Invalid analysis parameters" });
      }

      // Get the molecule
      const molecule = await storage.getMolecule(req.body.molecule_id);
      if (!molecule) {
        return res.status(404).json({ message: "Molecule not found" });
      }

      // For demonstration purposes, we'll create mock results
      // In a real implementation, this would call an actual model
      
      // Create the analysis
      const analysis = await storage.createAnalysis({
        molecule_id: req.body.molecule_id,
        model_type: req.body.model_type,
        prediction_type: req.body.prediction_type,
        quantum_depth: req.body.quantum_depth,
        results: {
          // Generate deterministic results based on molecule and parameters
          // In a real implementation, this would be the output of the ML model
          binding_affinity: {
            value: 8.2,
            confidence: 92,
          },
          bbb_permeability: {
            value: "High",
            score: 0.88,
            confidence: 89,
          },
          toxicity_risk: {
            value: "Low", 
            score: 0.15,
            confidence: 96,
          },
          solubility: {
            value: -2.14,
            score: 0.64,
            confidence: 87,
          },
          quantum_enhancement: {
            improvement: 34,
            circuit_depth: parseInt(req.body.quantum_depth.split(' ')[0]),
            qubits: 8,
          }
        },
      });

      res.status(201).json(analysis);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Get analysis by ID
  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const analysis = await storage.getAnalysis(id);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Get analyses by molecule ID
  app.get("/api/molecules/:id/analyses", async (req, res) => {
    try {
      const moleculeId = parseInt(req.params.id);
      const analyses = await storage.getAnalysesByMoleculeId(moleculeId);
      
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
