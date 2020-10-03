import { Component, OnInit, Input } from '@angular/core';
import { LaunchCardDetailsModel, LaunchDetailsValueType, SpaceXModel } from '../../models/spacex.models';
import { CARD_FORM_CONSTANTS } from '../../constants/spacex.constants';

@Component({
  selector: 'app-launch-card',
  templateUrl: './launch-card.component.html',
  styleUrls: ['./launch-card.component.scss']
})
export class LaunchCardComponent implements OnInit {

  @Input() launchDetails: SpaceXModel;
  public formValueType = LaunchDetailsValueType;
  public cardValue: LaunchCardDetailsModel[] = [];

  constructor() { }
  ngOnInit(): void {
    this.prepareCardDetails();
  }


  /**
   * Prepare the card details as a list from given constants
   * and the server provided response
   */
  public prepareCardDetails(): void {
    this.cardValue = CARD_FORM_CONSTANTS.map(formItem => {
      return {
        label: formItem.key,
        value: this.launchDetails[formItem.value] || null,
        type: Array.isArray(this.launchDetails[formItem.value]) ?
          this.formValueType.list : this.formValueType.string
      };
    });
  }

}
