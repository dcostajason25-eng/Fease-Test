export interface FeasibilityStudy {
  id: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;

  // Project Details
  location: string;
  plotArea: number; // sq ft
  builtUpArea: number; // sq ft
  numberOfUnits: number;
  projectType: string; // Residential, Commercial, Mixed-Use

  // Development Costs
  landCost: number;
  constructionCost: number;
  professionalFees: number;
  marketingCosts: number;
  contingency: number;
  financingCosts: number;
  totalDevelopmentCost: number;

  // Revenue
  averageSalePrice: number;
  totalRevenue: number;

  // Operating Expenses (Annual)
  maintenanceCosts: number;
  managementFees: number;
  utilities: number;
  insurance: number;
  propertyTax: number;
  totalOperatingExpenses: number;

  // Financial Metrics
  grossProfit: number;
  grossProfitMargin: number; // percentage
  netProfit: number;
  netProfitMargin: number; // percentage
  roi: number; // percentage
  breakEvenPoint: number; // months
  paybackPeriod: number; // years
  irr: number; // percentage
  npv: number;

  // Timeline
  developmentPeriod: number; // months
  salesPeriod: number; // months
  totalProjectDuration: number; // months

  // Additional Notes
  notes: string;
}

export interface FeasibilityFormData {
  projectName: string;
  location: string;
  plotArea: string;
  builtUpArea: string;
  numberOfUnits: string;
  projectType: string;
  landCost: string;
  constructionCost: string;
  professionalFees: string;
  marketingCosts: string;
  contingency: string;
  financingCosts: string;
  averageSalePrice: string;
  maintenanceCosts: string;
  managementFees: string;
  utilities: string;
  insurance: string;
  propertyTax: string;
  developmentPeriod: string;
  salesPeriod: string;
  notes: string;
}
