"use client";

import { useState } from "react";
import InvestmentForm from "@/components/InvestmentForm";
import InvestmentGraph from "@/components/InvestmentGraph";
import { compoundInterest } from "@/utils/calculator";

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};

const Page = () => {
  const [years, setYears] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [lowerValues, setLowerValues] = useState<number[]>([]);
  const [higherValues, setHigherValues] = useState<number[]>([]);
  const [finalValueUsd, setFinalValueUsd] = useState<number>(0);
  const [finalValueInr, setFinalValueInr] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  const handleCalculate = (investment: number, rate: number, contributions: number[], phases: number[]) => {
    const totalYears = phases.reduce((a, b) => a + b, 0);
    const baseValues = compoundInterest(investment, rate, contributions, phases);
    const lowerRateValues = compoundInterest(investment, rate - 5, contributions, phases);
    const higherRateValues = compoundInterest(investment, rate + 5, contributions, phases);
    
    setYears(Array.from({ length: totalYears + 1 }, (_, i) => i));
    setValues(baseValues);
    setLowerValues(lowerRateValues);
    setHigherValues(higherRateValues);
    setInterestRate(rate);
    
    setFinalValueUsd(baseValues[baseValues.length - 1]);
    setFinalValueInr(baseValues[baseValues.length - 1] * 86);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Investment Calculator</h1>
        
        <div className="space-y-6">
          <InvestmentForm onCalculate={handleCalculate} />
          
          {finalValueUsd > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Final Values</h2>
                <div className="space-y-2">
                  <p className="text-sm">USD: {formatCurrency(finalValueUsd, 'USD')}</p>
                  <p className="text-sm">INR: {formatCurrency(finalValueInr, 'INR')}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm flex justify-center items-center">
  {values.length > 0 && (
    <div className="w-full h-[250px] sm:h-[400px] lg:h-[500px] max-w-full">
      <InvestmentGraph
        years={years}
        values={values}
        lowerValues={lowerValues}
        higherValues={higherValues}
        baseRate={interestRate}
      />
    </div>
  )}
</div>



            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;