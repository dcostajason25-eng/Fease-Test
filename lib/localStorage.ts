import { FeasibilityStudy } from "@/types/feasibility";

const STORAGE_KEY = "feasibility-studies";

export const saveStudy = (study: FeasibilityStudy): void => {
  if (typeof window === "undefined") return;

  const studies = getAllStudies();
  const existingIndex = studies.findIndex(s => s.id === study.id);

  if (existingIndex >= 0) {
    studies[existingIndex] = study;
  } else {
    studies.push(study);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
};

export const getAllStudies = (): FeasibilityStudy[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getStudyById = (id: string): FeasibilityStudy | null => {
  const studies = getAllStudies();
  return studies.find(s => s.id === id) || null;
};

export const deleteStudy = (id: string): void => {
  if (typeof window === "undefined") return;

  const studies = getAllStudies();
  const filtered = studies.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
