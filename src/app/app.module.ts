import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/hu';
import { InputSeparatorDirective } from './directives/input-separator.directive';

@NgModule({
  declarations: [AppComponent, InputSeparatorDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
  ],
  providers: [CurrencyPipe,{provide: LOCALE_ID, useValue: 'hu-HU' },{provide: DEFAULT_CURRENCY_CODE, useValue: 'HUF'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
