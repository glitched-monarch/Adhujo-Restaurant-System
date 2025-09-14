
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ReportsOverview } from "./reports/ReportsOverview";

interface UnifiedReportsPanelProps {
  userRole?: "admin" | "manager" | "staff";
}

export const UnifiedReportsPanel = ({ userRole = "admin" }: UnifiedReportsPanelProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsOverview userRole={userRole} />
    </div>
  );
};
