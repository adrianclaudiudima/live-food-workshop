import {FormBuilder} from "@angular/forms";
import {inject} from "@angular/core";


export const buildShopForm = () => {
  const formBuilder: FormBuilder = inject(FormBuilder);
  return formBuilder.group({})
}
