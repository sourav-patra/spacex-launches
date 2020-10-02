
export interface SpaceXParams {
  launchSuccess?: boolean;
  landSuccess?: boolean;
  launchYear?: number;
}

export interface SpaceXModel {
  missionName: string;
  flightNumber: number;
  missionId: string[];
  launchYear: number;
  launchSuccess: boolean;
  launchLanding?: boolean;
  [additionalProperties: string]: any;
}

export interface FilterModel {
  label: string;
  value: string;
}
