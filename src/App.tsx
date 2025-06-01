import { ThemeProvider } from '@/components/theme-provider';
import WorkloadCalculator from '@/components/WorkloadCalculator';
import '@/App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 container mx-auto py-8 px-4">
          <WorkloadCalculator />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;