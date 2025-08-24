
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ComprehensiveSalesReports } from "./reports/ComprehensiveSalesReports";
import { ReportsOverview } from "./reports/ReportsOverview";

export const UnifiedReportsPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsOverview />
    </div>
  );
};
