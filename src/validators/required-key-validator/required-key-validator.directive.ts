import { Directive, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[required-key]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RequiredKeyDirective),
            multi: true
        }
    ]
})
export class RequiredKeyDirective implements Validator {

    @Input('required-key') keyName: string;
    get verify(): string {
        return this._keyName;
    }
    set verify(value: string) {
        this._keyName = value;
        if (this._onChange) {
            this._onChange();
        };
    }

    private _keyName: string;
    private _onChange: () => void;

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            required: true
        };
        return c.value && c.value[this.keyName] === '' ? err : null;
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

}