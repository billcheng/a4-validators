import { NgForm } from '@angular/forms';

function validateForm() {
    const forms = Object.keys(this).filter(key => {
        const keyType = Reflect.getOwnPropertyDescriptor(this, key);
        return keyType.value instanceof NgForm;
    });
    if (forms.length === 1) {
        const form: NgForm = this[forms[0]];
        Object.keys(form.controls).forEach(key => {
            const control = form.controls[key];
            control.markAsTouched();
            control.setValue(control.value);
            control.updateValueAndValidity();
        });
    } else {
        console.log(forms.length === 0 ?
            'Unable to find NgForm in the component' :
            `There are ${forms.length} NgForms in the component`);
    }
}

export function MethodValidateForm() {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        const method = descriptor.value;
        descriptor.value = function (): boolean {
            validateForm.apply(this);
            return method.apply(this, arguments);
        };
    };
}

export function PropertyValidateForm() {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<boolean>) {
        const method = descriptor.get;
        descriptor.get = function (): boolean {
            validateForm.apply(this);
            return method.apply(this, arguments);
        };
    };
}