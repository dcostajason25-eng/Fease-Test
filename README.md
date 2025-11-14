# Project Feasibility App

A beautiful, clean, and simple web application for creating and managing real estate development feasibility studies.

## Features

- **Create Feasibility Studies**: Input project details, costs, revenue, and timeline
- **Auto-Calculations**: Automatically calculates financial metrics (ROI, NPV, IRR, profit margins, etc.)
- **Local Storage**: Save and manage multiple feasibility studies locally
- **Excel Import/Export**: Import data from Excel files and export studies to formatted Excel workbooks
- **PDF Export**: Generate professional business plan PDFs
- **Clean UI**: Modern, responsive interface with sidebar navigation
- **Real-time Updates**: See financial metrics update as you input data

## Tech Stack

- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first CSS framework
- **XLSX** - Excel file handling
- **jsPDF** - PDF generation
- **Local Storage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dcostajason25-eng/Fease-Test.git
cd Fease-Test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Creating a New Study

1. Click "New Study" in the sidebar
2. Fill in project information (name, location, plot area, etc.)
3. Enter development costs (land, construction, fees, etc.)
4. Input revenue projections (average sale price per unit)
5. Add operating expenses (maintenance, management, utilities, etc.)
6. Specify project timeline (development and sales periods)
7. Click "Save Study" to store it locally

### Importing from Excel

1. Click "Import Excel" button
2. Select an Excel file with feasibility data
3. The form will be populated with imported data
4. Review and adjust as needed
5. Save the study

### Exporting

**Export to Excel:**
- Generates a formatted Excel workbook with two sheets:
  - Sheet 1: Complete project summary with all metrics
  - Sheet 2: Professional business plan format

**Export to PDF:**
- Creates a formatted business plan PDF document
- Includes executive summary, financial analysis, and timeline
- Professional layout suitable for presentations

## Project Structure

```
fease-test/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page component
├── components/           # Reusable components (future)
├── lib/
│   └── localStorage.ts   # Local storage utilities
├── types/
│   └── feasibility.ts    # TypeScript interfaces
├── utils/
│   ├── calculations.ts   # Financial calculations
│   ├── excelExport.ts    # Excel import/export
│   └── pdfExport.ts      # PDF generation
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Financial Metrics Calculated

- **Gross Profit & Margin**: Revenue minus development costs
- **Net Profit & Margin**: Gross profit minus operating expenses
- **ROI (Return on Investment)**: Percentage return on total investment
- **IRR (Internal Rate of Return)**: Annualized return rate
- **NPV (Net Present Value)**: Present value of future cash flows
- **Break-even Point**: Number of units needed to break even
- **Payback Period**: Time to recover initial investment

## Data Persistence

All feasibility studies are stored in the browser's local storage. Data persists between sessions but is specific to the browser and device being used.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is licensed under the MIT License.

## Author

Jason D Costa

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
