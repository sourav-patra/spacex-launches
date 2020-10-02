import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacexHomeComponent } from './pages/spacex-home/spacex-home.component';
import { FilterComponent } from './components/filter/filter.component';
import { LaunchCardComponent } from './components/launch-card/launch-card.component';
import { SpaceXRoutingModule } from './spacex-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SpacexHomeComponent,
    FilterComponent,
    LaunchCardComponent
  ],
  imports: [
    CommonModule,
    SpaceXRoutingModule,
    HttpClientModule
  ],
})
export class SpacexModule { }
