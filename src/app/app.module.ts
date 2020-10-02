import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpacexModule } from './spacex/spacex.module';
import { AppRoutingModule } from './app-routing.module';
import { InvalidRouteComponent } from './shared/components/invalid-route/invalid-route.component';

@NgModule({
  declarations: [
    AppComponent,
    InvalidRouteComponent,
  ],
  imports: [
    BrowserModule,
    SpacexModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
