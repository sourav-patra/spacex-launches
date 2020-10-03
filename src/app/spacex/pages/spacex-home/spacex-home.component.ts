import { Component, OnInit } from "@angular/core";
import * as CONST from "../../constants/spacex.constants";
import { SpacexService } from "../../services/spacex/spacex.service";

@Component({
  selector: "app-spacex-home",
  templateUrl: "./spacex-home.component.html",
  styleUrls: ["./spacex-home.component.scss"],
})
export class SpacexHomeComponent implements OnInit {
  public launchDetails$ = this.spaceXService.launchDetailsObs;
  public developerName = CONST.DEVELOPER_NAME;
  public loading$ = this.spaceXService.loadingDetails;
  constructor(private spaceXService: SpacexService) {}

  /**
   * Initial launch details
   */
  ngOnInit(): void {}
}
