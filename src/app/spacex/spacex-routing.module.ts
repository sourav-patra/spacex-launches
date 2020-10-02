import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpacexHomeComponent } from './pages/spacex-home/spacex-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: SpacexHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaceXRoutingModule {}
