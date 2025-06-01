import { WorkloadInputs } from './WorkloadCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, RefreshCw } from 'lucide-react';

interface InputSectionProps {
  inputs: WorkloadInputs;
  onInputChange: (name: keyof WorkloadInputs, value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export default function InputSection({ 
  inputs, 
  onInputChange, 
  onCalculate,
  onReset
}: InputSectionProps) {
  const hasInputs = Object.values(inputs).some(value => value !== '');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">工数入力</h3>
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="personMonths">人月</Label>
            <Input
              id="personMonths"
              type="number"
              placeholder="人月を入力"
              value={inputs.personMonths}
              onChange={(e) => onInputChange('personMonths', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="personDays">人日</Label>
            <Input
              id="personDays"
              type="number"
              placeholder="人日を入力"
              value={inputs.personDays}
              onChange={(e) => onInputChange('personDays', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="personHours">人時</Label>
            <Input
              id="personHours"
              type="number"
              placeholder="人時を入力"
              value={inputs.personHours}
              onChange={(e) => onInputChange('personHours', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={onCalculate}
          className="flex-1"
          disabled={!hasInputs}
        >
          <Calculator className="mr-2 h-4 w-4" />
          計算する
        </Button>
        
        {hasInputs && (
          <Button 
            variant="outline"
            onClick={onReset}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}