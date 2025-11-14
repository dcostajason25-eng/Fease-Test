import * as XLSX from "xlsx";
import { FeasibilityStudy } from "@/types/feasibility";

export const exportToExcel = (study: FeasibilityStudy): void => {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Sheet 1: Project Summary
  const summaryData = [
    ["PROJECT FEASIBILITY STUDY"],
    [],
    ["Project Information"],
    ["Project Name", study.projectName],
    ["Location", study.location],
    ["Project Type", study.projectType],
    ["Created", new Date(study.createdAt).toLocaleDateString()],
    [],
    ["Project Details"],
    ["Plot Area (sq ft)", study.plotArea],
    ["Built-up Area (sq ft)", study.builtUpArea],
    ["Number of Units", study.numberOfUnits],
    [],
    ["DEVELOPMENT COSTS"],
    ["Land Cost", study.landCost],
    ["Construction Cost", study.constructionCost],
    ["Professional Fees", study.professionalFees],
    ["Marketing Costs", study.marketingCosts],
    ["Contingency", study.contingency],
    ["Financing Costs", study.financingCosts],
    ["Total Development Cost", study.totalDevelopmentCost],
    [],
    ["REVENUE"],
    ["Average Sale Price per Unit", study.averageSalePrice],
    ["Total Revenue", study.totalRevenue],
    [],
    ["OPERATING EXPENSES (Annual)"],
    ["Maintenance Costs", study.maintenanceCosts],
    ["Management Fees", study.managementFees],
    ["Utilities", study.utilities],
    ["Insurance", study.insurance],
    ["Property Tax", study.propertyTax],
    ["Total Operating Expenses", study.totalOperatingExpenses],
    [],
    ["FINANCIAL METRICS"],
    ["Gross Profit", study.grossProfit],
    ["Gross Profit Margin (%)", study.grossProfitMargin.toFixed(2)],
    ["Net Profit", study.netProfit],
    ["Net Profit Margin (%)", study.netProfitMargin.toFixed(2)],
    ["ROI (%)", study.roi.toFixed(2)],
    ["Break-Even Point (Units)", study.breakEvenPoint],
    ["Payback Period (Years)", study.paybackPeriod.toFixed(2)],
    ["IRR (%)", study.irr.toFixed(2)],
    ["NPV", study.npv],
    [],
    ["TIMELINE"],
    ["Development Period (Months)", study.developmentPeriod],
    ["Sales Period (Months)", study.salesPeriod],
    ["Total Project Duration (Months)", study.totalProjectDuration],
    [],
    ["Notes"],
    [study.notes],
  ];

  const ws1 = XLSX.utils.aoa_to_sheet(summaryData);

  // Set column widths
  ws1["!cols"] = [{ wch: 30 }, { wch: 20 }];

  XLSX.utils.book_append_sheet(wb, ws1, "Summary");

  // Sheet 2: Business Plan Format
  const businessPlanData = [
    ["BUSINESS PLAN - " + study.projectName.toUpperCase()],
    [],
    ["EXECUTIVE SUMMARY"],
    [],
    ["Project Overview"],
    [
      `${study.projectName} is a ${study.projectType} development project located in ${study.location}. ` +
      `The project comprises ${study.numberOfUnits} units across ${study.builtUpArea.toLocaleString()} sq ft of built-up area.`
    ],
    [],
    ["Financial Highlights"],
    [`Total Investment Required: $${study.totalDevelopmentCost.toLocaleString()}`],
    [`Expected Total Revenue: $${study.totalRevenue.toLocaleString()}`],
    [`Net Profit: $${study.netProfit.toLocaleString()}`],
    [`Return on Investment: ${study.roi.toFixed(2)}%`],
    [`Payback Period: ${study.paybackPeriod.toFixed(1)} years`],
    [],
    ["1. PROJECT DESCRIPTION"],
    [],
    ["Location & Size"],
    [`Location: ${study.location}`],
    [`Plot Area: ${study.plotArea.toLocaleString()} sq ft`],
    [`Built-up Area: ${study.builtUpArea.toLocaleString()} sq ft`],
    [`Development Type: ${study.projectType}`],
    [`Total Units: ${study.numberOfUnits}`],
    [],
    ["2. FINANCIAL PLAN"],
    [],
    ["2.1 Development Costs"],
    ["Category", "Amount"],
    ["Land Acquisition", study.landCost],
    ["Construction", study.constructionCost],
    ["Professional Fees", study.professionalFees],
    ["Marketing & Sales", study.marketingCosts],
    ["Contingency", study.contingency],
    ["Financing Costs", study.financingCosts],
    ["Total", study.totalDevelopmentCost],
    [],
    ["2.2 Revenue Projections"],
    ["Average Price per Unit", study.averageSalePrice],
    ["Total Units", study.numberOfUnits],
    ["Total Expected Revenue", study.totalRevenue],
    [],
    ["2.3 Operating Expenses (Annual)"],
    ["Maintenance", study.maintenanceCosts],
    ["Management", study.managementFees],
    ["Utilities", study.utilities],
    ["Insurance", study.insurance],
    ["Property Tax", study.propertyTax],
    ["Total Operating Expenses", study.totalOperatingExpenses],
    [],
    ["3. FINANCIAL ANALYSIS"],
    [],
    ["Profitability Metrics"],
    ["Gross Profit", study.grossProfit],
    ["Gross Margin", study.grossProfitMargin.toFixed(2) + "%"],
    ["Net Profit", study.netProfit],
    ["Net Margin", study.netProfitMargin.toFixed(2) + "%"],
    [],
    ["Investment Returns"],
    ["Return on Investment (ROI)", study.roi.toFixed(2) + "%"],
    ["Internal Rate of Return (IRR)", study.irr.toFixed(2) + "%"],
    ["Net Present Value (NPV)", study.npv],
    ["Break-even Point", study.breakEvenPoint + " units"],
    ["Payback Period", study.paybackPeriod.toFixed(1) + " years"],
    [],
    ["4. PROJECT TIMELINE"],
    [],
    ["Development Period", study.developmentPeriod + " months"],
    ["Sales Period", study.salesPeriod + " months"],
    ["Total Duration", study.totalProjectDuration + " months"],
    [],
    ["5. RISK ASSESSMENT & MITIGATION"],
    [],
    ["Market Risk", "Medium - Contingency fund allocated"],
    ["Construction Risk", "Low - Experienced contractors"],
    ["Financial Risk", "Medium - Multiple financing options"],
    ["Regulatory Risk", "Low - All permits in process"],
    [],
    ["6. CONCLUSION"],
    [],
    [
      `Based on the comprehensive financial analysis, ${study.projectName} presents a ` +
      `viable investment opportunity with an expected ROI of ${study.roi.toFixed(2)}% and ` +
      `a payback period of ${study.paybackPeriod.toFixed(1)} years. The project demonstrates ` +
      `strong financial fundamentals and market potential.`
    ],
    [],
    ["Additional Notes"],
    [study.notes || "N/A"],
  ];

  const ws2 = XLSX.utils.aoa_to_sheet(businessPlanData);
  ws2["!cols"] = [{ wch: 35 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, ws2, "Business Plan");

  // Generate file
  const filename = `${study.projectName.replace(/[^a-z0-9]/gi, "_")}_Feasibility_${new Date().toISOString().split("T")[0]}.xlsx`;
  XLSX.writeFile(wb, filename);
};

export const importFromExcel = (file: File): Promise<Partial<FeasibilityStudy>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Read first sheet
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];

        // Parse data (this is a simplified parser - adjust based on your Excel format)
        const study: Partial<FeasibilityStudy> = {};

        // Look for specific rows
        jsonData.forEach((row, idx) => {
          const key = row[0]?.toString().toLowerCase();
          const value = row[1];

          if (key?.includes("project name")) study.projectName = value;
          if (key?.includes("location")) study.location = value;
          if (key?.includes("plot area")) study.plotArea = parseFloat(value) || 0;
          if (key?.includes("built-up area") || key?.includes("built up area")) study.builtUpArea = parseFloat(value) || 0;
          if (key?.includes("number of units")) study.numberOfUnits = parseFloat(value) || 0;
          if (key?.includes("project type")) study.projectType = value;
          if (key?.includes("land cost")) study.landCost = parseFloat(value) || 0;
          if (key?.includes("construction cost")) study.constructionCost = parseFloat(value) || 0;
          if (key?.includes("professional fees")) study.professionalFees = parseFloat(value) || 0;
          if (key?.includes("marketing costs")) study.marketingCosts = parseFloat(value) || 0;
          if (key?.includes("contingency")) study.contingency = parseFloat(value) || 0;
          if (key?.includes("financing costs")) study.financingCosts = parseFloat(value) || 0;
          if (key?.includes("average sale price")) study.averageSalePrice = parseFloat(value) || 0;
        });

        resolve(study);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};
