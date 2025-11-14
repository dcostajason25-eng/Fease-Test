import { FeasibilityStudy, FeasibilityFormData } from "@/types/feasibility";

export const calculateMetrics = (data: FeasibilityFormData): FeasibilityStudy => {
  // Parse all numeric values
  const plotArea = parseFloat(data.plotArea) || 0;
  const builtUpArea = parseFloat(data.builtUpArea) || 0;
  const numberOfUnits = parseFloat(data.numberOfUnits) || 0;

  const landCost = parseFloat(data.landCost) || 0;
  const constructionCost = parseFloat(data.constructionCost) || 0;
  const professionalFees = parseFloat(data.professionalFees) || 0;
  const marketingCosts = parseFloat(data.marketingCosts) || 0;
  const contingency = parseFloat(data.contingency) || 0;
  const financingCosts = parseFloat(data.financingCosts) || 0;

  const averageSalePrice = parseFloat(data.averageSalePrice) || 0;

  const maintenanceCosts = parseFloat(data.maintenanceCosts) || 0;
  const managementFees = parseFloat(data.managementFees) || 0;
  const utilities = parseFloat(data.utilities) || 0;
  const insurance = parseFloat(data.insurance) || 0;
  const propertyTax = parseFloat(data.propertyTax) || 0;

  const developmentPeriod = parseFloat(data.developmentPeriod) || 0;
  const salesPeriod = parseFloat(data.salesPeriod) || 0;

  // Calculate totals
  const totalDevelopmentCost =
    landCost +
    constructionCost +
    professionalFees +
    marketingCosts +
    contingency +
    financingCosts;

  const totalRevenue = averageSalePrice * numberOfUnits;

  const totalOperatingExpenses =
    maintenanceCosts +
    managementFees +
    utilities +
    insurance +
    propertyTax;

  // Calculate financial metrics
  const grossProfit = totalRevenue - totalDevelopmentCost;
  const grossProfitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const netProfit = grossProfit - totalOperatingExpenses;
  const netProfitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const roi = totalDevelopmentCost > 0 ? (netProfit / totalDevelopmentCost) * 100 : 0;

  const breakEvenPoint = averageSalePrice > 0
    ? Math.ceil(totalDevelopmentCost / averageSalePrice)
    : 0;

  const paybackPeriod = netProfit > 0 && totalOperatingExpenses > 0
    ? totalDevelopmentCost / (totalRevenue / (developmentPeriod + salesPeriod || 12))
    : 0;

  // Simplified IRR calculation (approximate)
  const irr = roi / (developmentPeriod / 12 || 1);

  // Simplified NPV calculation (assuming 10% discount rate)
  const discountRate = 0.10;
  const years = (developmentPeriod + salesPeriod) / 12 || 1;
  const npv = netProfit / Math.pow(1 + discountRate, years) - totalDevelopmentCost;

  const totalProjectDuration = developmentPeriod + salesPeriod;

  return {
    id: crypto.randomUUID(),
    projectName: data.projectName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: data.location,
    plotArea,
    builtUpArea,
    numberOfUnits,
    projectType: data.projectType,
    landCost,
    constructionCost,
    professionalFees,
    marketingCosts,
    contingency,
    financingCosts,
    totalDevelopmentCost,
    averageSalePrice,
    totalRevenue,
    maintenanceCosts,
    managementFees,
    utilities,
    insurance,
    propertyTax,
    totalOperatingExpenses,
    grossProfit,
    grossProfitMargin,
    netProfit,
    netProfitMargin,
    roi,
    breakEvenPoint,
    paybackPeriod,
    irr,
    npv,
    developmentPeriod,
    salesPeriod,
    totalProjectDuration,
    notes: data.notes,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
