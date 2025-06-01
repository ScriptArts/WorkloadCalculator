import { WorkloadInputs, MasterSettings, WorkloadResults } from '@/components/WorkloadCalculator';

/**
 * Converts a string value to a number, returning 0 if the value is empty or invalid
 */
const parseInputValue = (value: string): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculates the workload based on inputs and conversion settings
 */
export function calculateWorkload(
  inputs: WorkloadInputs,
  settings: MasterSettings
): WorkloadResults {
  // Parse all input values
  const personMonths = parseInputValue(inputs.personMonths);
  const personDays = parseInputValue(inputs.personDays);
  const personHours = parseInputValue(inputs.personHours);
  
  // Parse settings
  const daysPerMonth = Math.max(1, parseInputValue(settings.daysPerMonth)); // Ensure non-zero
  const hoursPerDay = Math.max(1, parseInputValue(settings.hoursPerDay));   // Ensure non-zero
  
  // Calculate total hours
  const totalHours = 
    (personMonths * daysPerMonth * hoursPerDay) + 
    (personDays * hoursPerDay) + 
    personHours;
  
  // Convert total hours back to each unit
  const calculatedDays = totalHours / hoursPerDay;
  const calculatedMonths = calculatedDays / daysPerMonth;
  
  return {
    personMonths: calculatedMonths,
    personDays: calculatedDays,
    personHours: totalHours
  };
}