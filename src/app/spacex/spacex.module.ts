import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FilterComponent } from "./components/filter/filter.component";
import { LaunchCardComponent } from "./components/launch-card/launch-card.component";
import { SpacexHomeComponent } from "./pages/spacex-home/spacex-home.component";
import { SpaceXRoutingModule } from "./spacex-routing.module";

@NgModule({
  declarations: [SpacexHomeComponent, FilterComponent, LaunchCardComponent],
  imports: [CommonModule, SpaceXRoutingModule, HttpClientModule],
})
export class SpacexModule {}
