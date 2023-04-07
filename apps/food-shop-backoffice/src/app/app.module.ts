import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {IconRegistryModule, MaterialModule} from "@livesession-food-workshop-angular/core/theme";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LayoutModule} from "@angular/cdk/layout";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    IconRegistryModule,
    RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
