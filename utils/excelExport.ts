import ExcelJS from "exceljs";
import { FeasibilityStudy } from "@/types/feasibility";

export const exportToExcel = async (study: FeasibilityStudy): Promise<void> => {
  // Create workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Project Feasibility App";
  workbook.created = new Date();

  // Sheet 1: Project Summary
  const sheet1 = workbook.addWorksheet("Summary");

  // Title
  const titleRow = sheet1.addRow(["PROJECT FEASIBILITY STUDY"]);
  titleRow.font = { size: 16, bold: true };
  sheet1.mergeCells("A1:B1");
  titleRow.alignment = { horizontal: "center" };

  sheet1.addRow([]);

  // Project Information Section
  const projectInfoHeader = sheet1.addRow(["Project Information"]);
  projectInfoHeader.font = { bold: true, size: 12 };
  projectInfoHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet1.addRow(["Project Name", study.projectName]);
  sheet1.addRow(["Location", study.location]);
  sheet1.addRow(["Project Type", study.projectType]);
  sheet1.addRow(["Created", new Date(study.createdAt).toLocaleDateString()]);

  sheet1.addRow([]);

  // Project Details
  const detailsHeader = sheet1.addRow(["Project Details"]);
  detailsHeader.font = { bold: true, size: 12 };
  detailsHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet1.addRow(["Plot Area (sq ft)", study.plotArea]);
  sheet1.addRow(["Built-up Area (sq ft)", study.builtUpArea]);
  sheet1.addRow(["Number of Units", study.numberOfUnits]);

  sheet1.addRow([]);

  // Development Costs
  const costsHeader = sheet1.addRow(["DEVELOPMENT COSTS"]);
  costsHeader.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  costsHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4472C4" },
  };

  sheet1.addRow(["Land Cost", study.landCost]);
  sheet1.addRow(["Construction Cost", study.constructionCost]);
  sheet1.addRow(["Professional Fees", study.professionalFees]);
  sheet1.addRow(["Marketing Costs", study.marketingCosts]);
  sheet1.addRow(["Contingency", study.contingency]);
  sheet1.addRow(["Financing Costs", study.financingCosts]);
  const totalDevRow = sheet1.addRow(["Total Development Cost", study.totalDevelopmentCost]);
  totalDevRow.font = { bold: true };

  sheet1.addRow([]);

  // Revenue
  const revenueHeader = sheet1.addRow(["REVENUE"]);
  revenueHeader.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  revenueHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF70AD47" },
  };

  sheet1.addRow(["Average Sale Price per Unit", study.averageSalePrice]);
  sheet1.addRow(["Total Revenue", study.totalRevenue]);

  sheet1.addRow([]);

  // Operating Expenses
  const opexHeader = sheet1.addRow(["OPERATING EXPENSES (Annual)"]);
  opexHeader.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  opexHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFC000" },
  };

  sheet1.addRow(["Maintenance Costs", study.maintenanceCosts]);
  sheet1.addRow(["Management Fees", study.managementFees]);
  sheet1.addRow(["Utilities", study.utilities]);
  sheet1.addRow(["Insurance", study.insurance]);
  sheet1.addRow(["Property Tax", study.propertyTax]);
  const totalOpexRow = sheet1.addRow(["Total Operating Expenses", study.totalOperatingExpenses]);
  totalOpexRow.font = { bold: true };

  sheet1.addRow([]);

  // Financial Metrics
  const metricsHeader = sheet1.addRow(["FINANCIAL METRICS"]);
  metricsHeader.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
  metricsHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF5B9BD5" },
  };

  sheet1.addRow(["Gross Profit", study.grossProfit]);
  sheet1.addRow(["Gross Profit Margin (%)", study.grossProfitMargin.toFixed(2)]);
  sheet1.addRow(["Net Profit", study.netProfit]);
  sheet1.addRow(["Net Profit Margin (%)", study.netProfitMargin.toFixed(2)]);
  sheet1.addRow(["ROI (%)", study.roi.toFixed(2)]);
  sheet1.addRow(["Break-Even Point (Units)", study.breakEvenPoint]);
  sheet1.addRow(["Payback Period (Years)", study.paybackPeriod.toFixed(2)]);
  sheet1.addRow(["IRR (%)", study.irr.toFixed(2)]);
  sheet1.addRow(["NPV", study.npv]);

  sheet1.addRow([]);

  // Timeline
  const timelineHeader = sheet1.addRow(["TIMELINE"]);
  timelineHeader.font = { bold: true, size: 12 };
  timelineHeader.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet1.addRow(["Development Period (Months)", study.developmentPeriod]);
  sheet1.addRow(["Sales Period (Months)", study.salesPeriod]);
  sheet1.addRow(["Total Project Duration (Months)", study.totalProjectDuration]);

  sheet1.addRow([]);

  // Notes
  const notesHeader = sheet1.addRow(["Notes"]);
  notesHeader.font = { bold: true };
  sheet1.addRow([study.notes]);

  // Set column widths
  sheet1.getColumn(1).width = 35;
  sheet1.getColumn(2).width = 20;

  // Format currency cells
  const currencyFormat = '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)';
  [15, 16, 17, 18, 19, 20, 21, 26, 27, 31, 32, 33, 34, 35, 36, 42, 50].forEach((rowNum) => {
    const cell = sheet1.getCell(`B${rowNum}`);
    if (cell.value && typeof cell.value === "number") {
      cell.numFmt = currencyFormat;
    }
  });

  // Sheet 2: Business Plan
  const sheet2 = workbook.addWorksheet("Business Plan");

  // Business Plan Title
  const bpTitleRow = sheet2.addRow([`BUSINESS PLAN - ${study.projectName.toUpperCase()}`]);
  bpTitleRow.font = { size: 16, bold: true };
  sheet2.mergeCells("A1:B1");
  bpTitleRow.alignment = { horizontal: "center" };

  sheet2.addRow([]);

  // Executive Summary
  const execSummaryHeader = sheet2.addRow(["EXECUTIVE SUMMARY"]);
  execSummaryHeader.font = { bold: true, size: 14 };

  sheet2.addRow([]);

  const overviewHeader = sheet2.addRow(["Project Overview"]);
  overviewHeader.font = { bold: true };

  const overviewText = sheet2.addRow([
    `${study.projectName} is a ${study.projectType} development project located in ${study.location}. ` +
    `The project comprises ${study.numberOfUnits} units across ${study.builtUpArea.toLocaleString()} sq ft of built-up area.`
  ]);
  sheet2.mergeCells(`A${overviewText.number}:B${overviewText.number}`);

  sheet2.addRow([]);

  const highlightsHeader = sheet2.addRow(["Financial Highlights"]);
  highlightsHeader.font = { bold: true };

  sheet2.addRow([`Total Investment Required: $${study.totalDevelopmentCost.toLocaleString()}`]);
  sheet2.addRow([`Expected Total Revenue: $${study.totalRevenue.toLocaleString()}`]);
  sheet2.addRow([`Net Profit: $${study.netProfit.toLocaleString()}`]);
  sheet2.addRow([`Return on Investment: ${study.roi.toFixed(2)}%`]);
  sheet2.addRow([`Payback Period: ${study.paybackPeriod.toFixed(1)} years`]);

  sheet2.addRow([]);

  // Section 1: Project Description
  const section1Header = sheet2.addRow(["1. PROJECT DESCRIPTION"]);
  section1Header.font = { bold: true, size: 12 };
  section1Header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet2.addRow([]);
  sheet2.addRow(["Location & Size"]);
  sheet2.addRow([`Location: ${study.location}`]);
  sheet2.addRow([`Plot Area: ${study.plotArea.toLocaleString()} sq ft`]);
  sheet2.addRow([`Built-up Area: ${study.builtUpArea.toLocaleString()} sq ft`]);
  sheet2.addRow([`Development Type: ${study.projectType}`]);
  sheet2.addRow([`Total Units: ${study.numberOfUnits}`]);

  sheet2.addRow([]);

  // Section 2: Financial Plan
  const section2Header = sheet2.addRow(["2. FINANCIAL PLAN"]);
  section2Header.font = { bold: true, size: 12 };
  section2Header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet2.addRow([]);
  sheet2.addRow(["2.1 Development Costs"]);
  const costsTableHeader = sheet2.addRow(["Category", "Amount"]);
  costsTableHeader.font = { bold: true };

  sheet2.addRow(["Land Acquisition", study.landCost]);
  sheet2.addRow(["Construction", study.constructionCost]);
  sheet2.addRow(["Professional Fees", study.professionalFees]);
  sheet2.addRow(["Marketing & Sales", study.marketingCosts]);
  sheet2.addRow(["Contingency", study.contingency]);
  sheet2.addRow(["Financing Costs", study.financingCosts]);
  const totalRow = sheet2.addRow(["Total", study.totalDevelopmentCost]);
  totalRow.font = { bold: true };

  sheet2.addRow([]);
  sheet2.addRow(["2.2 Revenue Projections"]);
  sheet2.addRow(["Average Price per Unit", study.averageSalePrice]);
  sheet2.addRow(["Total Units", study.numberOfUnits]);
  sheet2.addRow(["Total Expected Revenue", study.totalRevenue]);

  sheet2.addRow([]);
  sheet2.addRow(["2.3 Operating Expenses (Annual)"]);
  sheet2.addRow(["Maintenance", study.maintenanceCosts]);
  sheet2.addRow(["Management", study.managementFees]);
  sheet2.addRow(["Utilities", study.utilities]);
  sheet2.addRow(["Insurance", study.insurance]);
  sheet2.addRow(["Property Tax", study.propertyTax]);
  const totalOpex = sheet2.addRow(["Total Operating Expenses", study.totalOperatingExpenses]);
  totalOpex.font = { bold: true };

  sheet2.addRow([]);

  // Additional sections
  const section3Header = sheet2.addRow(["3. FINANCIAL ANALYSIS"]);
  section3Header.font = { bold: true, size: 12 };
  section3Header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  sheet2.addRow([]);
  sheet2.addRow(["Profitability Metrics"]);
  sheet2.addRow(["Gross Profit", study.grossProfit]);
  sheet2.addRow(["Gross Margin", `${study.grossProfitMargin.toFixed(2)}%`]);
  sheet2.addRow(["Net Profit", study.netProfit]);
  sheet2.addRow(["Net Margin", `${study.netProfitMargin.toFixed(2)}%`]);

  sheet2.addRow([]);
  sheet2.addRow(["Investment Returns"]);
  sheet2.addRow(["ROI", `${study.roi.toFixed(2)}%`]);
  sheet2.addRow(["IRR", `${study.irr.toFixed(2)}%`]);
  sheet2.addRow(["NPV", study.npv]);
  sheet2.addRow(["Break-even", `${study.breakEvenPoint} units`]);
  sheet2.addRow(["Payback Period", `${study.paybackPeriod.toFixed(1)} years`]);

  // Set column widths for sheet 2
  sheet2.getColumn(1).width = 40;
  sheet2.getColumn(2).width = 20;

  // Generate file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const filename = `${study.projectName.replace(/[^a-z0-9]/gi, "_")}_Feasibility_${new Date().toISOString().split("T")[0]}.xlsx`;

  // Download file
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const importFromExcel = (file: File): Promise<Partial<FeasibilityStudy>> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          throw new Error("No worksheet found");
        }

        const study: Partial<FeasibilityStudy> = {};

        // Parse data from worksheet
        worksheet.eachRow((row) => {
          const key = row.getCell(1).value?.toString().toLowerCase() || "";
          const value = row.getCell(2).value;

          if (key.includes("project name")) study.projectName = value?.toString();
          if (key.includes("location")) study.location = value?.toString();
          if (key.includes("plot area")) study.plotArea = parseFloat(value?.toString() || "0");
          if (key.includes("built-up area") || key.includes("built up area"))
            study.builtUpArea = parseFloat(value?.toString() || "0");
          if (key.includes("number of units")) study.numberOfUnits = parseFloat(value?.toString() || "0");
          if (key.includes("project type")) study.projectType = value?.toString();
          if (key.includes("land cost")) study.landCost = parseFloat(value?.toString() || "0");
          if (key.includes("construction cost")) study.constructionCost = parseFloat(value?.toString() || "0");
          if (key.includes("professional fees")) study.professionalFees = parseFloat(value?.toString() || "0");
          if (key.includes("marketing costs")) study.marketingCosts = parseFloat(value?.toString() || "0");
          if (key.includes("contingency")) study.contingency = parseFloat(value?.toString() || "0");
          if (key.includes("financing costs")) study.financingCosts = parseFloat(value?.toString() || "0");
          if (key.includes("average sale price")) study.averageSalePrice = parseFloat(value?.toString() || "0");
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
