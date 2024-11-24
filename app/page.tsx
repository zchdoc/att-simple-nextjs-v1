export default function Home() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Welcome to Attendance System</h1>
          <p className="text-muted-foreground">
            Please select an option from the sidebar to get started.
          </p>
        </div>
      </main>
    </div>
  );
}