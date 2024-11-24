import { ManualCheckIn } from '@/components/manual-check-in';

export default function CheckInPage() {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Manual Check-in</h1>
        <ManualCheckIn />
      </div>
    </main>
  );
}