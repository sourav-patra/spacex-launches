import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TransferHttpCacheModule } from "@nguniversal/common";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InvalidRouteComponent } from "./shared/components/invalid-route/invalid-route.component";
import { SpacexModule } from "./spacex/spacex.module";

@NgModule({
  declarations: [AppComponent, InvalidRouteComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    SpacexModule,
    AppRoutingModule,
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
