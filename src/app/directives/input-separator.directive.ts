import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputSeparator]'
})
export class InputSeparatorDirective {

  constructor(private inputEl: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event:any){
    if (this.inputEl.nativeElement.value === '-') return;
    let commasRemoved = this.inputEl.nativeElement.value.replace(/,/g, '');
    let toInt: number;
    let toLocale: string;
    if (commasRemoved.split('.').length > 1) {
      let decimal =isNaN(parseInt(commasRemoved.split('.')[1]))? '':parseInt(commasRemoved.split('.')[1]);
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('hu-HU') + '.' + decimal;
    } else {
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('hu-HU');
    }
    if (toLocale === 'NaN') {
      this.inputEl.nativeElement.value = '';
    } else {
      this.inputEl.nativeElement.value = toLocale;
    }
  }

}
