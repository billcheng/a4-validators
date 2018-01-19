import { RequiredKeyDirective } from './validators/required-key-validator/required-key-validator.directive';
import { ConditionalRequiredDirective } from './validators/conditional-required-validator/conditional-required-validator.directive';
import { TimeValidatorDirective } from './validators/time-validator/time-validator.directive';
import { DateValidatorDirective } from './validators/date-validator/date-validator.directive';
import { MatchValidatorDirective } from './validators/match-validator/match-validator.directive';
import { RangeValidatorDirective } from './validators/range-validator/range-validator.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

const components = [
  RangeValidatorDirective,
  MatchValidatorDirective,
  DateValidatorDirective,
  TimeValidatorDirective,
  ConditionalRequiredDirective,
  RequiredKeyDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: components,
  exports: components
})
export class ValidatorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ValidatorsModule,
      providers: []
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: ValidatorsModule,
      providers: []
    };
  }
}