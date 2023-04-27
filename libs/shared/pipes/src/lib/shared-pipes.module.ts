import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentPipe} from "./moment.pipe";
import {UnixMomentPipe} from "./unix-moment.pipe";

@NgModule({
  declarations: [UnixMomentPipe, MomentPipe],
  imports: [CommonModule],
  exports: [UnixMomentPipe, MomentPipe]
})
export class SharedPipesModule {
}
