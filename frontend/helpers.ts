export function calculateMultiplier(years: number, rate: number): number {
    const i = rate / 100;
    return (1 - Math.pow(1 + i, -years)) / i;
  }
  
  console.log(calculateMultiplier(37, 1.5));