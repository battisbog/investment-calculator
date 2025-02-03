import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvestmentFormProps {
  onCalculate: (investment: number, rate: number, contributions: number[], phases: number[]) => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onCalculate }) => {
  const [currentInvestment, setCurrentInvestment] = useState(100000);
  const [interestRate, setInterestRate] = useState(22);
  const [usdToInr, setUsdToInr] = useState(86);
  
  const [phases, setPhases] = useState([
    { years: 1, contribution: 100000 },
    { years: 2, contribution: 130000 },
    { years: 3, contribution: 200000 },
    { years: 3, contribution: 200000 }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(
      currentInvestment,
      interestRate,
      phases.map(p => p.contribution),
      phases.map(p => p.years)
    );
  };

  const handlePhaseChange = (index: number, field: 'years' | 'contribution', value: number) => {
    setPhases(prevPhases => {
      const newPhases = [...prevPhases];
      newPhases[index] = {
        ...newPhases[index],
        [field]: value
      };
      return newPhases;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="initial">Initial Investment ($)</Label>
              <Input
                id="initial"
                type="number"
                value={currentInvestment}
                onChange={(e) => setCurrentInvestment(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="interest">Interest Rate (%)</Label>
              <Input
                id="interest"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="usdRate">USD to INR Rate</Label>
              <Input
                id="usdRate"
                type="number"
                value={usdToInr}
                onChange={(e) => setUsdToInr(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Investment Phases</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {phases.map((phase, index) => (
              <div key={index} className="space-y-2 p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Phase {index + 1}</h4>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`phase-${index}-years`} className="text-xs">
                      Years
                    </Label>
                    <Input
                      id={`phase-${index}-years`}
                      type="number"
                      min="1"
                      value={phase.years}
                      onChange={(e) => handlePhaseChange(index, 'years', Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`phase-${index}-contribution`} className="text-xs">
                      Annual $ Contribution
                    </Label>
                    <Input
                      id={`phase-${index}-contribution`}
                      type="number"
                      value={phase.contribution}
                      onChange={(e) => handlePhaseChange(index, 'contribution', Number(e.target.value))}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
      >
        Calculate Investment
      </button>
    </form>
  );
};

export default InvestmentForm;