import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InvalidRouteComponent } from "./shared/components/invalid-route/invalid-route.component";
import { SpacexModule } from "./spacex/spacex.module";

export const routes: Route[] = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: (): Promise<SpacexModule> =>
      import("./spacex/spacex.module").then((m) => m.SpacexModule),
  },
  { path: "404", component: InvalidRouteComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
