import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InputSection from '@/components/InputSection';
import MasterSection from '@/components/MasterSection';
import ResultsSection from '@/components/ResultsSection';
import { calculateWorkload } from '@/lib/calculations';
import { ClipboardCheck } from 'lucide-react';

export type WorkloadInputs = {
  personMonths: string;
  personDays: string;
  personHours: string;
};

export type MasterSettings = {
  daysPerMonth: string;
  hoursPerDay: string;
};

export type WorkloadResults = {
  personMonths: number;
  personDays: number;
  personHours: number;
};

const DEFAULT_INPUTS: WorkloadInputs = {
  personMonths: '',
  personDays: '',
  personHours: '',
};

const DEFAULT_SETTINGS: MasterSettings = {
  daysPerMonth: '20',
  hoursPerDay: '8',
};

export default function WorkloadCalculator() {
  const [inputs, setInputs] = useState<WorkloadInputs>(DEFAULT_INPUTS);
  const [settings, setSettings] = useState<MasterSettings>(DEFAULT_SETTINGS);
  const [results, setResults] = useState<WorkloadResults | null>(null);
  const [activeTab, setActiveTab] = useState<string>('input');

  const handleInputChange = (name: keyof WorkloadInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (name: keyof MasterSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    const calculatedResults = calculateWorkload(inputs, settings);
    setResults(calculatedResults);
    
    if (calculatedResults) {
      setActiveTab('results');
    }
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResults(null);
    setActiveTab('input');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2 mb-2">
          <ClipboardCheck className="h-8 w-8" />
          <span>工数電卓</span>
        </h1>
        <p className="text-muted-foreground">工数を簡単に計算</p>
      </div>
      
      <Card className="border-2">
        <CardHeader>
          <CardTitle>工数計算ツール</CardTitle>
          <CardDescription>
            工数を入力し、設定に基づいて計算します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input">入力</TabsTrigger>
              <TabsTrigger value="settings">設定</TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>結果</TabsTrigger>
            </TabsList>
            
            <TabsContent value="input" className="space-y-4">
              <InputSection 
                inputs={inputs} 
                onInputChange={handleInputChange} 
                onCalculate={handleCalculate}
                onReset={handleReset}
              />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <MasterSection 
                settings={settings} 
                onSettingsChange={handleSettingsChange} 
                onCalculate={handleCalculate}
              />
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              {results && (
                <ResultsSection 
                  results={results} 
                  settings={settings}
                  onRecalculate={() => setActiveTab('input')}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}