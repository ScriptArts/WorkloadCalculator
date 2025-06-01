import { MasterSettings, WorkloadResults } from './WorkloadCalculator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ResultsSectionProps {
  results: WorkloadResults;
  settings: MasterSettings;
  onRecalculate: () => void;
}

export default function ResultsSection({ 
  results, 
  settings,
  onRecalculate
}: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">計算結果</h3>
        
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="grid divide-y">
            <ResultItem 
              label="人月" 
              value={results.personMonths.toFixed(2)}
              detail={`1人月 = ${settings.daysPerMonth}日`}
            />
            <ResultItem 
              label="人日" 
              value={results.personDays.toFixed(2)}
              detail={`1人日 = ${settings.hoursPerDay}時間`}
            />
            <ResultItem 
              label="人時" 
              value={results.personHours.toFixed(2)}
              detail="総作業時間"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-2">
        <Button 
          onClick={onRecalculate}
          className="w-full"
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          入力に戻る
        </Button>
      </div>
    </div>
  );
}

interface ResultItemProps {
  label: string;
  value: string;
  detail: string;
}

function ResultItem({ label, value, detail }: ResultItemProps) {
  return (
    <div className="flex justify-between p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}