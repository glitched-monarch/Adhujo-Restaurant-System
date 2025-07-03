
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Filter } from "lucide-react";
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns";

export interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeFilterProps {
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

export const DateRangeFilter = ({ onDateRangeChange, className }: DateRangeFilterProps) => {
  const [selectedRange, setSelectedRange] = useState<string>("all");
  const [customFrom, setCustomFrom] = useState<Date>();
  const [customTo, setCustomTo] = useState<Date>();
  const [isCustom, setIsCustom] = useState(false);

  const handlePresetChange = (value: string) => {
    setSelectedRange(value);
    setIsCustom(value === "custom");
    
    const now = new Date();
    let from: Date;
    let to: Date = endOfDay(now);

    switch (value) {
      case "today":
        from = startOfDay(now);
        break;
      case "yesterday":
        from = startOfDay(subDays(now, 1));
        to = endOfDay(subDays(now, 1));
        break;
      case "last7days":
        from = startOfDay(subDays(now, 7));
        break;
      case "last30days":
        from = startOfDay(subDays(now, 30));
        break;
      case "thisMonth":
        from = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
        break;
      case "lastMonth":
        const lastMonth = subMonths(now, 1);
        from = startOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1));
        to = endOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0));
        break;
      case "thisYear":
        from = startOfDay(new Date(now.getFullYear(), 0, 1));
        break;
      case "lastYear":
        from = startOfDay(new Date(now.getFullYear() - 1, 0, 1));
        to = endOfDay(new Date(now.getFullYear() - 1, 11, 31));
        break;
      case "custom":
        return;
      default:
        // "all" - set a very wide range
        from = startOfDay(subYears(now, 10));
        break;
    }

    if (value !== "custom") {
      onDateRangeChange({ from, to });
    }
  };

  const handleCustomRangeApply = () => {
    if (customFrom && customTo) {
      onDateRangeChange({
        from: startOfDay(customFrom),
        to: endOfDay(customTo)
      });
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-end ${className}`}>
      <div className="flex-1">
        <Label htmlFor="dateRange">Time Period</Label>
        <Select value={selectedRange} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7days">Last 7 Days</SelectItem>
            <SelectItem value="last30days">Last 30 Days</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isCustom && (
        <>
          <div>
            <Label htmlFor="fromDate">From Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customFrom ? format(customFrom, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customFrom}
                  onSelect={setCustomFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="toDate">To Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customTo ? format(customTo, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customTo}
                  onSelect={setCustomTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleCustomRangeApply} disabled={!customFrom || !customTo}>
            Apply Range
          </Button>
        </>
      )}
    </div>
  );
};
