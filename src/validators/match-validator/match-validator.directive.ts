import { Directive, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[match-validator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MatchValidatorDirective),
            multi: true
        }
    ]
})
export class MatchValidatorDirective implements Validator {

    @Input('match-validator')
    get verify(): string {
        return this._verify;
    }
    set verify(value: string) {
        this._verify = value;
        if (this._onChange) {
            this._onChange();
        };
    }

    private _verify: string;
    private _onChange: () => void;

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            match: {
                given: c.value,
                match: this.verify
            }
        };
        return c.value === this.verify ? null : err;
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}