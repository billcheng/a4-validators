import { Directive, ElementRef, Input, OnInit, HostListener, forwardRef, Attribute } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: 'input[range-validator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => RangeValidatorDirective), multi: true }
    ]
})
export class RangeValidatorDirective implements Validator {

    @Input()
    get min(): number {
        return this._min;
    }
    set min(value: number) {
        this._min = value;
        if (this._onChange) {
            this._onChange();
        }
    }
    @Input()
    get max(): number {
        return this._max;
    }
    set max(value: number) {
        this._max = value;
        if (this._onChange) {
            this._onChange();
        }
    }

    private _onChange: () => void;
    private _min: number;
    private _max: number;

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            range: {
                given: c.value,
                min: this.min,
                max: this.max
            }
        };

        if (c.value != null && !isNaN(this.min) && c.value < this.min) {
            return err;
        }

        if (c.value != null && !isNaN(this.max) && c.value > this.max) {
            return err;
        }

        return null;
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}