import { Component, Input, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-group',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
      <fieldset [formGroupName]="controlKey">
        <legend>{{label}}</legend>
        <div class="form-field">
          <label for="zipCode">Zip Code</label>
          <input formControlName="zipCode" type="text" id="zipCode">

          <div *ngIf="parentFormGroup.get(controlKey)?.get('zipCode')?.invalid && (parentFormGroup.get(controlKey)?.get('zipCode')?.touched)" class="alert">
            <div *ngIf="parentFormGroup.get(controlKey)?.get('zipCode')?.errors?.required">
            Please enter zipCode
          </div>
        </div>

        </div>
        <div class="form-field">
          <label for="address">Street</label>
          <input formControlName="street" type="text" id="address">

        </div>
        <div *ngIf="parentFormGroup.get(controlKey)?.get('street')?.invalid && (parentFormGroup.get(controlKey)?.get('street')?.touched)" class="alert">
            <div *ngIf="parentFormGroup.get(controlKey)?.get('street')?.errors?.required">
            Please enter address
          </div>
        </div>
      </fieldset>

     <pre>xxxxx {{ parentFormGroup.invalid}}</pre>

  `,
})
export class AddressGroupComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        zipCode: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required]),
      })
    );
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
  get myForm() {
    return this.parentFormGroup.get(this.controlKey);
  }
}
