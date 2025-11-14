import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FeasibilityStudy } from "@/types/feasibility";
import { formatCurrency, formatNumber } from "./calculations";

export const exportToPDF = (study: FeasibilityStudy): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let yPos = 20;

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("PROJECT FEASIBILITY STUDY", pageWidth / 2, yPos, { align: "center" });

  yPos += 15;

  // Project Header
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.text(study.projectName, pageWidth / 2, yPos, { align: "center" });

  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${study.location} | ${study.projectType}`, pageWidth / 2, yPos, { align: "center" });

  yPos += 3;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: "center" });

  yPos += 15;

  // Executive Summary Box
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 35, "F");

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("EXECUTIVE SUMMARY", margin + 5, yPos + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const col1X = margin + 5;
  const col2X = pageWidth / 2 + 5;

  yPos += 15;
  doc.text(`Total Investment: ${formatCurrency(study.totalDevelopmentCost)}`, col1X, yPos);
  doc.text(`Expected Revenue: ${formatCurrency(study.totalRevenue)}`, col2X, yPos);

  yPos += 7;
  doc.text(`Net Profit: ${formatCurrency(study.netProfit)}`, col1X, yPos);
  doc.text(`Profit Margin: ${formatNumber(study.netProfitMargin)}%`, col2X, yPos);

  yPos += 7;
  doc.text(`ROI: ${formatNumber(study.roi)}%`, col1X, yPos);
  doc.text(`Payback Period: ${formatNumber(study.paybackPeriod)} years`, col2X, yPos);

  yPos += 15;

  // Project Details
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(41, 128, 185);
  doc.text("1. PROJECT DETAILS", margin, yPos);

  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [["Attribute", "Value"]],
    body: [
      ["Plot Area", `${formatNumber(study.plotArea)} sq ft`],
      ["Built-up Area", `${formatNumber(study.builtUpArea)} sq ft`],
      ["Number of Units", formatNumber(study.numberOfUnits)],
      ["Average Price per Unit", formatCurrency(study.averageSalePrice)],
    ],
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Development Costs
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("2. DEVELOPMENT COSTS", margin, yPos);

  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [["Cost Category", "Amount"]],
    body: [
      ["Land Acquisition", formatCurrency(study.landCost)],
      ["Construction", formatCurrency(study.constructionCost)],
      ["Professional Fees", formatCurrency(study.professionalFees)],
      ["Marketing & Sales", formatCurrency(study.marketingCosts)],
      ["Contingency", formatCurrency(study.contingency)],
      ["Financing Costs", formatCurrency(study.financingCosts)],
    ],
    foot: [["Total Development Cost", formatCurrency(study.totalDevelopmentCost)]],
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
    footStyles: { fillColor: [52, 73, 94], fontStyle: "bold" },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Check if we need a new page
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Revenue & Operating Expenses
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3. REVENUE & OPERATING EXPENSES", margin, yPos);

  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [["Item", "Amount"]],
    body: [
      ["Total Revenue", formatCurrency(study.totalRevenue)],
      ["", ""],
      ["Annual Operating Expenses:", ""],
      ["  Maintenance", formatCurrency(study.maintenanceCosts)],
      ["  Management Fees", formatCurrency(study.managementFees)],
      ["  Utilities", formatCurrency(study.utilities)],
      ["  Insurance", formatCurrency(study.insurance)],
      ["  Property Tax", formatCurrency(study.propertyTax)],
    ],
    foot: [["Total Operating Expenses", formatCurrency(study.totalOperatingExpenses)]],
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
    footStyles: { fillColor: [52, 73, 94], fontStyle: "bold" },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Check if we need a new page
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Financial Analysis
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("4. FINANCIAL ANALYSIS", margin, yPos);

  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [["Metric", "Value"]],
    body: [
      ["Gross Profit", formatCurrency(study.grossProfit)],
      ["Gross Profit Margin", `${formatNumber(study.grossProfitMargin)}%`],
      ["Net Profit", formatCurrency(study.netProfit)],
      ["Net Profit Margin", `${formatNumber(study.netProfitMargin)}%`],
      ["Return on Investment (ROI)", `${formatNumber(study.roi)}%`],
      ["Internal Rate of Return (IRR)", `${formatNumber(study.irr)}%`],
      ["Net Present Value (NPV)", formatCurrency(study.npv)],
      ["Break-even Point", `${study.breakEvenPoint} units`],
      ["Payback Period", `${formatNumber(study.paybackPeriod)} years`],
    ],
    theme: "grid",
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Check if we need a new page
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Timeline
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("5. PROJECT TIMELINE", margin, yPos);

  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [["Phase", "Duration"]],
    body: [
      ["Development Period", `${study.developmentPeriod} months`],
      ["Sales Period", `${study.salesPeriod} months`],
      ["Total Project Duration", `${study.totalProjectDuration} months`],
    ],
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: margin, right: margin },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Notes
  if (study.notes) {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("6. ADDITIONAL NOTES", margin, yPos);

    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(study.notes, pageWidth - 2 * margin);
    doc.text(splitNotes, margin, yPos);
  }

  // Footer on last page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${totalPages} | ${study.projectName}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save
  const filename = `${study.projectName.replace(/[^a-z0-9]/gi, "_")}_Business_Plan_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(filename);
};
