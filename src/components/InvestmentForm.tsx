import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4 p-4">
      {/* Initial Values Section */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={currentInvestment}
              onChange={(e) => setCurrentInvestment(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">USD to INR Rate</label>
            <input
              type="number"
              value={usdToInr}
              onChange={(e) => setUsdToInr(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Investment Phases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {phases.map((phase, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-medium">Phase {index + 1}</h4>
              <div>
                <label className="block text-sm mb-1">Years</label>
                <input
                  type="number"
                  min="1"
                  value={phase.years}
                  onChange={(e) => handlePhaseChange(index, 'years', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Annual $ Contribution</label>
                <input
                  type="number"
                  value={phase.contribution}
                  onChange={(e) => handlePhaseChange(index, 'contribution', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white p-3 rounded-lg"
      >
        Calculate Investment
      </button>
    </form>
  );
};

export default InvestmentForm;