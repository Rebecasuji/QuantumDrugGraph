import { apiRequest } from "./queryClient";

// Molecule API calls
export async function uploadMolecule(data: FormData) {
  const response = await fetch("/api/molecules", {
    method: "POST",
    body: data,
    credentials: "include",
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to upload molecule");
  }
  
  return response.json();
}

export async function getMolecule(id: number) {
  const response = await fetch(`/api/molecules/${id}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to get molecule");
  }
  
  return response.json();
}

// Analysis API calls
export async function runAnalysis(data: {
  molecule_id: number;
  model_type: string;
  prediction_type: string;
  quantum_depth: string;
}) {
  const response = await apiRequest("POST", "/api/analyses", data);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to run analysis");
  }
  
  return response.json();
}

export async function getAnalysis(id: number) {
  const response = await fetch(`/api/analyses/${id}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to get analysis");
  }
  
  return response.json();
}

export async function getMoleculeAnalyses(moleculeId: number) {
  const response = await fetch(`/api/molecules/${moleculeId}/analyses`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to get analyses");
  }
  
  return response.json();
}
