"use client";

import { useState, useEffect } from "react";
import { FeasibilityStudy, FeasibilityFormData } from "@/types/feasibility";
import { saveStudy, getAllStudies, deleteStudy } from "@/lib/localStorage";
import { calculateMetrics, formatCurrency, formatNumber } from "@/utils/calculations";
import { exportToExcel, importFromExcel } from "@/utils/excelExport";
import { exportToPDF } from "@/utils/pdfExport";

export default function Home() {
  const [studies, setStudies] = useState<FeasibilityStudy[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<FeasibilityStudy | null>(null);
  const [isNewStudy, setIsNewStudy] = useState(true);

  const [formData, setFormData] = useState<FeasibilityFormData>({
    projectName: "",
    location: "",
    plotArea: "",
    builtUpArea: "",
    numberOfUnits: "",
    projectType: "Residential",
    landCost: "",
    constructionCost: "",
    professionalFees: "",
    marketingCosts: "",
    contingency: "",
    financingCosts: "",
    averageSalePrice: "",
    maintenanceCosts: "",
    managementFees: "",
    utilities: "",
    insurance: "",
    propertyTax: "",
    developmentPeriod: "",
    salesPeriod: "",
    notes: "",
  });

  useEffect(() => {
    loadStudies();
  }, []);

  const loadStudies = () => {
    const loadedStudies = getAllStudies();
    setStudies(loadedStudies);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.projectName.trim()) {
      alert("Please enter a project name");
      return;
    }

    const study = calculateMetrics(formData);
    saveStudy(study);
    loadStudies();
    setSelectedStudy(study);
    alert("Study saved successfully!");
  };

  const handleNewStudy = () => {
    setIsNewStudy(true);
    setSelectedStudy(null);
    setFormData({
      projectName: "",
      location: "",
      plotArea: "",
      builtUpArea: "",
      numberOfUnits: "",
      projectType: "Residential",
      landCost: "",
      constructionCost: "",
      professionalFees: "",
      marketingCosts: "",
      contingency: "",
      financingCosts: "",
      averageSalePrice: "",
      maintenanceCosts: "",
      managementFees: "",
      utilities: "",
      insurance: "",
      propertyTax: "",
      developmentPeriod: "",
      salesPeriod: "",
      notes: "",
    });
  };

  const handleSelectStudy = (study: FeasibilityStudy) => {
    setSelectedStudy(study);
    setIsNewStudy(false);
    setFormData({
      projectName: study.projectName,
      location: study.location,
      plotArea: study.plotArea.toString(),
      builtUpArea: study.builtUpArea.toString(),
      numberOfUnits: study.numberOfUnits.toString(),
      projectType: study.projectType,
      landCost: study.landCost.toString(),
      constructionCost: study.constructionCost.toString(),
      professionalFees: study.professionalFees.toString(),
      marketingCosts: study.marketingCosts.toString(),
      contingency: study.contingency.toString(),
      financingCosts: study.financingCosts.toString(),
      averageSalePrice: study.averageSalePrice.toString(),
      maintenanceCosts: study.maintenanceCosts.toString(),
      managementFees: study.managementFees.toString(),
      utilities: study.utilities.toString(),
      insurance: study.insurance.toString(),
      propertyTax: study.propertyTax.toString(),
      developmentPeriod: study.developmentPeriod.toString(),
      salesPeriod: study.salesPeriod.toString(),
      notes: study.notes,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this study?")) {
      deleteStudy(id);
      loadStudies();
      if (selectedStudy?.id === id) {
        handleNewStudy();
      }
    }
  };

  const handleExportExcel = () => {
    if (!selectedStudy) {
      alert("Please save the study first");
      return;
    }
    exportToExcel(selectedStudy);
  };

  const handleExportPDF = () => {
    if (!selectedStudy) {
      alert("Please save the study first");
      return;
    }
    exportToPDF(selectedStudy);
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await importFromExcel(file);
      setFormData({
        projectName: importedData.projectName || "",
        location: importedData.location || "",
        plotArea: importedData.plotArea?.toString() || "",
        builtUpArea: importedData.builtUpArea?.toString() || "",
        numberOfUnits: importedData.numberOfUnits?.toString() || "",
        projectType: importedData.projectType || "Residential",
        landCost: importedData.landCost?.toString() || "",
        constructionCost: importedData.constructionCost?.toString() || "",
        professionalFees: importedData.professionalFees?.toString() || "",
        marketingCosts: importedData.marketingCosts?.toString() || "",
        contingency: importedData.contingency?.toString() || "",
        financingCosts: importedData.financingCosts?.toString() || "",
        averageSalePrice: importedData.averageSalePrice?.toString() || "",
        maintenanceCosts: "",
        managementFees: "",
        utilities: "",
        insurance: "",
        propertyTax: "",
        developmentPeriod: "",
        salesPeriod: "",
        notes: "",
      });
      setIsNewStudy(true);
      setSelectedStudy(null);
      alert("Excel file imported successfully!");
    } catch (error) {
      alert("Failed to import Excel file. Please check the format.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Feasibility Studies</h1>
        </div>

        <div className="p-4">
          <button
            onClick={handleNewStudy}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-4"
          >
            + New Study
          </button>

          <div className="space-y-2">
            {studies.map((study) => (
              <div
                key={study.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedStudy?.id === study.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                onClick={() => handleSelectStudy(study)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {study.projectName}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(study.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-xs text-gray-600">{study.location}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ROI: {formatNumber(study.roi)}%
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(study.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {isNewStudy ? "New Feasibility Study" : formData.projectName}
                </h2>
                <p className="text-gray-600 mt-1">
                  Real Estate Development Analysis
                </p>
              </div>
              <div className="flex gap-2">
                <label className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm">
                  Import Excel
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleImportExcel}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={handleExportExcel}
                  disabled={!selectedStudy}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  Export Excel
                </button>
                <button
                  onClick={handleExportPDF}
                  disabled={!selectedStudy}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                >
                  Export PDF
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Project Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plot Area (sq ft)
                </label>
                <input
                  type="number"
                  name="plotArea"
                  value={formData.plotArea}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Built-up Area (sq ft)
                </label>
                <input
                  type="number"
                  name="builtUpArea"
                  value={formData.builtUpArea}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Units
                </label>
                <input
                  type="number"
                  name="numberOfUnits"
                  value={formData.numberOfUnits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mixed-Use">Mixed-Use</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Development Costs */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Development Costs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Cost ($)
                </label>
                <input
                  type="number"
                  name="landCost"
                  value={formData.landCost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Construction Cost ($)
                </label>
                <input
                  type="number"
                  name="constructionCost"
                  value={formData.constructionCost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Fees ($)
                </label>
                <input
                  type="number"
                  name="professionalFees"
                  value={formData.professionalFees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marketing Costs ($)
                </label>
                <input
                  type="number"
                  name="marketingCosts"
                  value={formData.marketingCosts}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contingency ($)
                </label>
                <input
                  type="number"
                  name="contingency"
                  value={formData.contingency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Financing Costs ($)
                </label>
                <input
                  type="number"
                  name="financingCosts"
                  value={formData.financingCosts}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Average Sale Price per Unit ($)
                </label>
                <input
                  type="number"
                  name="averageSalePrice"
                  value={formData.averageSalePrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Operating Expenses (Annual)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maintenance Costs ($)
                </label>
                <input
                  type="number"
                  name="maintenanceCosts"
                  value={formData.maintenanceCosts}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Management Fees ($)
                </label>
                <input
                  type="number"
                  name="managementFees"
                  value={formData.managementFees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Utilities ($)
                </label>
                <input
                  type="number"
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance ($)
                </label>
                <input
                  type="number"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Tax ($)
                </label>
                <input
                  type="number"
                  name="propertyTax"
                  value={formData.propertyTax}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Timeline</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Development Period (months)
                </label>
                <input
                  type="number"
                  name="developmentPeriod"
                  value={formData.developmentPeriod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sales Period (months)
                </label>
                <input
                  type="number"
                  name="salesPeriod"
                  value={formData.salesPeriod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Notes</h3>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter any additional notes or comments..."
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Save Study
            </button>
          </div>

          {/* Financial Summary (if study is saved) */}
          {selectedStudy && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mt-6 text-white">
              <h3 className="text-2xl font-bold mb-6">Financial Summary</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Total Investment</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selectedStudy.totalDevelopmentCost)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Expected Revenue</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selectedStudy.totalRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Net Profit</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selectedStudy.netProfit)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">ROI</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(selectedStudy.roi)}%
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(selectedStudy.netProfitMargin)}%
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">Payback Period</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(selectedStudy.paybackPeriod)} years
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
