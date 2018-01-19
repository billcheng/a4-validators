import { Directive, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

import * as moment from 'moment';

@Directive({
    selector: '[date-validator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateValidatorDirective),
            multi: true
        }
    ]
})
export class DateValidatorDirective implements Validator {

    @Input()
    get format(): string {
        return this._format;
    }
    set format(value: string) {
        this._format = value;
        if (this._onChange) {
            this._onChange();
        }
    }

    private _format = 'YYYY-M-D';
    private _onChange: () => void;

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            date: {
                given: c.value,
                format: this.format
            }
        };

        return moment(c.value, this.format, true).isValid() ? null : err;
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}
