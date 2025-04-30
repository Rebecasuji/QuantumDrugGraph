import { pgTable, text, serial, integer, boolean, json, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Molecular data storage
export const molecules = pgTable("molecules", {
  id: serial("id").primaryKey(),
  name: text("name"),
  smiles: text("smiles").notNull(),
  file_format: varchar("file_format", { length: 10 }),
  created_at: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  user_id: integer("user_id").references(() => users.id),
});

export const insertMoleculeSchema = createInsertSchema(molecules).pick({
  name: true,
  smiles: true,
  file_format: true,
  user_id: true,
});

export type InsertMolecule = z.infer<typeof insertMoleculeSchema>;
export type Molecule = typeof molecules.$inferSelect;

// Analysis results storage
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  molecule_id: integer("molecule_id").notNull().references(() => molecules.id),
  model_type: text("model_type").notNull(),
  prediction_type: text("prediction_type").notNull(),
  quantum_depth: text("quantum_depth"),
  results: json("results").notNull(),
  created_at: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true,
  created_at: true,
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

// Extended schemas for form validation
export const smilesInputSchema = z.object({
  smiles: z.string().min(1, "SMILES string is required"),
});

export const analysisParametersSchema = z.object({
  model_type: z.enum(["GNN", "Quantum GNN", "Hybrid Classical-Quantum"]),
  prediction_type: z.enum(["Binding Affinity", "Toxicity", "Solubility", "Blood-Brain Barrier Permeability"]),
  quantum_depth: z.enum(["Low (1-2 layers)", "Medium (3-5 layers)", "High (6+ layers)"]),
});
