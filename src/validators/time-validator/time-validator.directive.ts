import { Directive, ElementRef, Input, Renderer, HostListener, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Directive({
    selector: 'input[time-validator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => TimeValidatorDirective),
        multi: true
    }]
})
export class TimeValidatorDirective implements Validator {

    validate(c: FormControl): { [key: string]: any; } {
        const err = {
            time: {
                given: c.value,
                min: '0000',
                max: '2359'
            }
        };

        if (c.value == null) {
            return null;
        }

        const value: string = c.value.toString();
        let hour: number = -1;
        let min: number = -1;

        if (value.length === 3) {
            hour = parseInt(value.substring(0, 1), 10);
            min = parseInt(value.substring(1, 3), 10);
        } else if (value.length === 4) {
            hour = parseInt(value.substring(0, 2), 10);
            min = parseInt(value.substring(2, 4), 10);
        }

        return (hour < 0 || hour > 23 || min < 0 || min > 59) ? err : null;
    }

}