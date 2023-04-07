import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputNumberButtonComponent} from "./input-number-button/input-number-button.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [InputNumberButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [InputNumberButtonComponent]
})
export class SharedComponentsInputNumberButtonModule {

}
