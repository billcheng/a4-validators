# Angular Validators
Angular 4 Validators

# Installation
1. npm install --save-dev a4-validators

# How To Use
```html
<input [(ngModel)]="var" range-validator [min]="1" [max]="10">
<input [(ngModel)]="var" match-validator [verify]="match">
```