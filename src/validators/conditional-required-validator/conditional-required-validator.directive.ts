import { Directive, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[conditional-required]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ConditionalRequiredDirective),
            multi: true
        }
    ]
})
export class ConditionalRequiredDirective implements Validator {

    @Input('conditional-required')
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = value;
        if (this._onChange) {
            this._onChange();
        };
    }

    private _required: boolean;
    private _onChange: () => void;

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            required: true
        };
        return this.required && !c.value ? err : null;
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}