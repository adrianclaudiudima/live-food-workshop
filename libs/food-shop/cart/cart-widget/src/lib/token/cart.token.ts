import {InjectionToken} from "@angular/core";
import {OverlayRef} from "@angular/cdk/overlay";

export const CART_TITLE_TOKEN = new InjectionToken<string>('CART TITLE TOKEN')
export const CART_OVERLAY_REF_TOKEN = new InjectionToken<OverlayRef>('CART OVERLAY REF TOKEN')
