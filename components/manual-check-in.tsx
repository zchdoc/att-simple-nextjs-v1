"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ManualCheckIn() {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!employeeId || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
      const payload = `${employeeId}\t${formattedDate}\t0\t15\t\t0\t0`;

      const response = await fetch("/api/attendance/check-in", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Check-in successful");
        setEmployeeId("");
        setDate(undefined);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error("Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Manual Check-in</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Employee ID</label>
            <Input
              placeholder="Enter employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-in Time</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckIn}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Check In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}