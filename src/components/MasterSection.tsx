import { MasterSettings } from './WorkloadCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';

interface MasterSectionProps {
  settings: MasterSettings;
  onSettingsChange: (name: keyof MasterSettings, value: string) => void;
  onCalculate: () => void;
}

export default function MasterSection({ 
  settings, 
  onSettingsChange,
  onCalculate
}: MasterSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">換算設定</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="daysPerMonth">1人月あたりの日数</Label>
            <Input
              id="daysPerMonth"
              type="number"
              value={settings.daysPerMonth}
              onChange={(e) => onSettingsChange('daysPerMonth', e.target.value)}
              min="1"
              step="0.5"
            />
            <p className="text-sm text-muted-foreground">
              1人月を何日として計算するか設定します
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="hoursPerDay">1人日あたりの時間</Label>
            <Input
              id="hoursPerDay"
              type="number"
              value={settings.hoursPerDay}
              onChange={(e) => onSettingsChange('hoursPerDay', e.target.value)}
              min="1"
              step="0.5"
            />
            <p className="text-sm text-muted-foreground">
              1人日を何時間として計算するか設定します
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onCalculate}
        className="w-full"
      >
        <Calculator className="mr-2 h-4 w-4" />
        設定を適用して計算
      </Button>
    </div>
  );
}