import {InjectionToken} from "@angular/core";
import {BehaviorSubject} from "rxjs";

export interface Tax {
  vatRatePercentage: number;
  serviceChargePercentage: number
}

export const TAX_TOKEN = new InjectionToken<Tax>('TAX INJECTION TOKEN')


export const TAX_TOKEN_OBS = new InjectionToken<BehaviorSubject<Tax>>('TAX OBS InjectionToken');
