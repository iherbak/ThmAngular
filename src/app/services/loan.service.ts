import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor() {}

  public calculateMonthlyPayment(
    loan: number,
    annualInterest: number,
    years: number
  ) {
    let monthylyRate = annualInterest / 12;
    let numberOfPayments = years * 12;

    let powBase = (100 + monthylyRate) / 100;
    return (
      (loan * (monthylyRate / 100) * Math.pow(powBase, numberOfPayments)) /
      (Math.pow(powBase, numberOfPayments) - 1)
    );
  }

  public calcuateThm(
    loan: number,
    credit: number,
    additionals: number,
    monthlyAdditionals: number,
    years: number,
    delta: number = 100
  ) {
    let currentStep = 1;
    let calculatedCredit = 0;
    let annualInterest = 0.1;
    let numberOfPayments = years * 12;

    while (!this.withinDelta(calculatedCredit, credit + additionals + monthlyAdditionals * numberOfPayments, delta)) {
      let monthlyPay = this.calculateMonthlyPayment(
        loan,
        annualInterest,
        years
      );

      calculatedCredit = monthlyPay * numberOfPayments - loan;

      let adjustedStep = this.adjustInterest(
        calculatedCredit,
        credit + additionals + monthlyAdditionals * numberOfPayments,
        currentStep
      );
      if (adjustedStep != currentStep) {
        annualInterest -= currentStep;
      }
      currentStep = adjustedStep;
      annualInterest += currentStep;
    }
    return annualInterest;
  }

  private withinDelta(result: number, target: number, delta: number) {
    return Math.abs(target - result) <= delta;
  }

  public adjustInterest(result: number, target: number, step: number): number {
    if (result < target) {
      return step;
    }
    if (result > target) {
      step /= 2;
    }
    return step;
  }
}
