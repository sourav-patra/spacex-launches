import { Component, Input, OnInit } from "@angular/core";
import { CARD_FORM_CONSTANTS } from "../../constants/spacex.constants";
import {
  LaunchCardDetailsModel,
  LaunchDetailsValueType,
  SpaceXModel,
  SpaceXParamsEnum,
} from "../../models/spacex.models";

@Component({
  selector: "app-launch-card",
  templateUrl: "./launch-card.component.html",
  styleUrls: ["./launch-card.component.scss"],
})
export class LaunchCardComponent implements OnInit {
  @Input() launchDetails: SpaceXModel;
  public formValueType = LaunchDetailsValueType;
  public cardValue: LaunchCardDetailsModel[] = [];
  public imageLoading = true;
  constructor() {}

  /**
   * Prepare Card prototypes
   */
  ngOnInit(): void {
    this.prepareCardDetails();
  }

  /**
   * Hide the image loader when it is rendered in the DOM
   */
  public onImageLoad(): void {
    this.imageLoading = false;
  }

  /**
   * Check for undefined or null
   */
  public isUndefinedOrNull(value: any): boolean {
    return value === null || value === undefined;
  }

  /**
   * Prepare the card details as a list from given constants
   * and the server provided response
   */
  public prepareCardDetails(): void {
    this.cardValue = CARD_FORM_CONSTANTS.map((formItem) => {
      const formValue =
        formItem.value === SpaceXParamsEnum.LAND
          ? this.launchDetails.rocket?.firstStage?.cores[0].landSuccess
          : this.launchDetails[formItem.value];
      return {
        label: formItem.key,
        value: this.isUndefinedOrNull(formValue) ? "N/A" : formValue,
        type: Array.isArray(this.launchDetails[formItem.value])
          ? this.formValueType.list
          : this.formValueType.string,
      };
    });
  }
}
