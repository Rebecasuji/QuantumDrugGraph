import { users, type User, type InsertUser, type Molecule, type InsertMolecule, type Analysis, type InsertAnalysis } from "@shared/schema";

// Modify the interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Molecule methods
  getMolecule(id: number): Promise<Molecule | undefined>;
  getMoleculeBySmiles(smiles: string): Promise<Molecule | undefined>;
  createMolecule(molecule: InsertMolecule): Promise<Molecule>;
  
  // Analysis methods
  getAnalysis(id: number): Promise<Analysis | undefined>;
  getAnalysesByMoleculeId(moleculeId: number): Promise<Analysis[]>;
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private molecules: Map<number, Molecule>;
  private analyses: Map<number, Analysis>;
  
  private userId: number;
  private moleculeId: number;
  private analysisId: number;

  constructor() {
    this.users = new Map();
    this.molecules = new Map();
    this.analyses = new Map();
    
    this.userId = 1;
    this.moleculeId = 1;
    this.analysisId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Molecule methods
  async getMolecule(id: number): Promise<Molecule | undefined> {
    return this.molecules.get(id);
  }
  
  async getMoleculeBySmiles(smiles: string): Promise<Molecule | undefined> {
    return Array.from(this.molecules.values()).find(
      (molecule) => molecule.smiles === smiles,
    );
  }
  
  async createMolecule(insertMolecule: InsertMolecule): Promise<Molecule> {
    const id = this.moleculeId++;
    const created_at = new Date().toISOString();
    const molecule: Molecule = { ...insertMolecule, id, created_at };
    this.molecules.set(id, molecule);
    return molecule;
  }
  
  // Analysis methods
  async getAnalysis(id: number): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }
  
  async getAnalysesByMoleculeId(moleculeId: number): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).filter(
      (analysis) => analysis.molecule_id === moleculeId,
    );
  }
  
  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.analysisId++;
    const created_at = new Date().toISOString();
    const analysis: Analysis = { ...insertAnalysis, id, created_at };
    this.analyses.set(id, analysis);
    return analysis;
  }
}

export const storage = new MemStorage();
