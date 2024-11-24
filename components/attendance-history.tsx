"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {format} from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {CalendarIcon, Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

interface AttendanceRecord {
  date: string;
  time: string;
  signInStateStr: string;
  beLateTime: string;
  thanTheWay: string;
  signInType: number;
}

export function AttendanceHistory() {
  const [employeeId, setEmployeeId] = useState("3000002");
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([
    new Date(),
    new Date(),
  ]);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<AttendanceRecord[][]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = async () => {
    if (!employeeId || !dateRange[0] || !dateRange[1]) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const timeStart = format(dateRange[0], "yyyy-MM-dd 00:00:00");
      const timeEnd = format(dateRange[1], "yyyy-MM-dd 23:59:59");
      console.info('timeStart: ', timeStart);
      console.info('timeEnd: ', timeEnd);
      let apiUrl = `/api/attendance/history?userNo=${employeeId}&timeStart=${timeStart}&timeEnd=${timeEnd}`;
      const response = await fetch(
        apiUrl,
      );

      const data = await response.json();
      console.info('data: ', data);
      console.info('data: ', JSON.stringify(data));
      if (data.success) {
        setRecords(data.data);
        toast.success("Records fetched successfully");
      }
      else {
        throw new Error(data.error);
      }
    }
    catch (error) {
      toast.error("Failed to fetch records");
    }
    finally {
      setLoading(false);
    }
  };

  const getDayRecords = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return records.find(group =>
      group.some(record => record.date === formattedDate)
    ) || [];
  };

  const renderRecordDetails = (records: AttendanceRecord[]) => (
    <div className="space-y-2 mt-4">
      {records.map((record, index) => (
        <div key={index} className="p-3 border rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">{record.time}</span>
            <Badge variant={
              record.signInStateStr === "正常签到" ||
              record.signInStateStr === "正常签退"
                ? "default"
                : record.signInStateStr === "加班"
                  ? "secondary"
                  : "destructive"
            }>
              {record.signInStateStr}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            <p>Method: {record.thanTheWay}</p>
            {record.beLateTime && record.beLateTime !== "0" && (
              <p>Late by: {record.beLateTime}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Attendance History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee ID</label>
              <Input
                placeholder="Enter employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="grid gap-2 md:grid-cols-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange[0] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {dateRange[0] ? format(dateRange[0], "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange[0]}
                      onSelect={(date) => setDateRange([date, dateRange[1]])}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange[1] && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {dateRange[1] ? format(dateRange[1], "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange[1]}
                      onSelect={(date) => setDateRange([dateRange[0], date])}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <Button
            className="w-full md:w-auto"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            Search Records
          </Button>
          {records.length > 0 && (
            <div className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    modifiers={{
                      hasRecord: (date) =>
                        records.some(group =>
                          group.some(record => record.date === format(date, "yyyy-MM-dd"))
                        )
                    }}
                    modifiersStyles={{
                      hasRecord: {
                        backgroundColor: "var(--primary)",
                        color: "darkred",
                        borderRadius: "50%"
                      }
                    }}
                    className="rounded-md border"
                  />
                </div>
                <div>
                  {selectedDate && (
                    <div>
                      <h3 className="font-medium mb-2">
                        Records for {format(selectedDate, "PPP")}
                      </h3>
                      {renderRecordDetails(getDayRecords(selectedDate))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
