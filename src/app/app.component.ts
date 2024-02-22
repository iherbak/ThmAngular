import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { LoanService } from './services/loan.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'THMAngular';

  private unsubscribe: Subject<void>;

  public thmForm: FormGroup;

  public results = {
    loan: 0,
    years: 0,
    monthlyPaymentsCount: 0,
    annualInterest: 0,
    monthlyPayment: 0,
    fullPayment: 0,
    loanCost: 0,
    thm: 0,
  };

  public get LoanField() {
    return this.thmForm.get('loan') as UntypedFormControl;
  }

  public get YearsField() {
    return this.thmForm.get('years') as UntypedFormControl;
  }

  public get AnnualInterestField() {
    return this.thmForm.get('annualInterest') as UntypedFormControl;
  }

  public get AdditionalCostsField() {
    return this.thmForm.get('additionalCosts') as UntypedFormControl;
  }

  public get AdditionalMonthlyCostsField() {
    return this.thmForm.get('additionalMonthlyCosts') as UntypedFormControl;
  }
  /**
   *
   */
  constructor(formBuilder: FormBuilder, private loanService: LoanService) {
    this.unsubscribe = new Subject();

    this.thmForm = formBuilder.group({
      loan: [12000000],
      years: [20],
      annualInterest: [6.2],
      additionalCosts: [0],
      additionalMonthlyCosts: [0],
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.LoanField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.results = this.calculateResults();
      });

    this.AnnualInterestField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.results = this.calculateResults();
      });

    this.YearsField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.results = this.calculateResults();
      });

    this.AdditionalCostsField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.results = this.calculateResults();
      });

    this.AdditionalMonthlyCostsField.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.results = this.calculateResults();
      });

    this.results = this.calculateResults();
  }

  private calculateResults() {
    let results = {
      loan: this.LoanField.value,
      years: this.YearsField.value,
      monthlyPaymentsCount: this.YearsField.value * 12,
      annualInterest: this.AnnualInterestField.value / 100,
      monthlyPayment: this.loanService.calculateMonthlyPayment(
        this.LoanField.value,
        this.AnnualInterestField.value,
        this.YearsField.value
      ),
      fullPayment: 0,
      loanCost: 0,
      thm: 0,
    };
    let monthlyPaymentsSum =
      results.monthlyPayment * results.monthlyPaymentsCount;
    results.fullPayment =
      monthlyPaymentsSum +
      this.AdditionalCostsField.value +
      this.AdditionalMonthlyCostsField.value * results.monthlyPaymentsCount;
    results.loanCost = monthlyPaymentsSum - results.loan;
    results.thm = this.loanService.calcuateThm(
      this.LoanField.value,
      results.loanCost,
      this.AdditionalCostsField.value,
      this.AdditionalMonthlyCostsField.value,
      this.YearsField.value
    ) / 100;
    return results;
  }
}
