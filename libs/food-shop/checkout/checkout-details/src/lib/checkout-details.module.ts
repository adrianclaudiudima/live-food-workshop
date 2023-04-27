import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {
  SharedComponentsInputRadioCardModule
} from "@livesession-food-workshop-angular/shared/components/input-radio-card";
import {CheckoutDetailsComponent} from "./checkout-details/checkout-details.component";

@NgModule({
  declarations: [CheckoutDetailsComponent],
  imports: [CommonModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    SharedComponentsInputRadioCardModule,
  ],
  exports: [CheckoutDetailsComponent]
})
export class CheckoutDetailsModule {
}
