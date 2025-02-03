export function compoundInterest(
    currentInvestment: number,
    interestRate: number,
    phaseContributions: number[],
    phases: number[]
  ): number[] {
    const monthlyRate = (interestRate / 100) / 12;
    let balance = currentInvestment;
    const yearlyValues = [balance];
  
    for (let phaseIdx = 0; phaseIdx < phases.length; phaseIdx++) {
      const monthlyContribution = phaseContributions[phaseIdx] / 12;
  
      for (let year = 1; year <= phases[phaseIdx]; year++) {
        for (let month = 0; month < 12; month++) {
          balance += monthlyContribution;
          balance *= 1 + monthlyRate;
        }
        yearlyValues.push(balance);
      }
    }
  
    return yearlyValues;
  }