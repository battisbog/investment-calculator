"use client";

import { useState } from "react";
import InvestmentForm from "@/components/InvestmentForm";
import InvestmentGraph from "@/components/InvestmentGraph";
import { compoundInterest } from "@/utils/calculator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    
    // Set final values
    setFinalValueUsd(baseValues[baseValues.length - 1]);
    setFinalValueInr(baseValues[baseValues.length - 1] * 86); // Using fixed rate of 86
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Investment Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <InvestmentForm onCalculate={handleCalculate} />
          {finalValueUsd > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Final Investment Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>USD: {formatCurrency(finalValueUsd, 'USD')}</p>
                <p>INR: {formatCurrency(finalValueInr, 'INR')}</p>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          {values.length > 0 && (
            <InvestmentGraph
              years={years}
              values={values}
              lowerValues={lowerValues}
              higherValues={higherValues}
              baseRate={interestRate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;