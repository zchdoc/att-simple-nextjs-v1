import { AttendanceHistory } from '@/components/attendance-history';

export default function HistoryPage() {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Attendance History</h1>
        <AttendanceHistory />
      </div>
    </main>
  );
}