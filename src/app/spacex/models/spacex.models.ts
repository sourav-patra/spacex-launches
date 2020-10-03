
export interface SpaceXParams {
  launchSuccess?: boolean;
  landSuccess?: boolean;
  launchYear?: number;
}

export interface SpaceXModel {
  missionName: string;
  flightNumber: number;
  details: string;
  missionId: string[];
  launchYear: number;
  launchSuccess: boolean;
  launchLanding?: boolean;
  links?: SpaceXModelLinks;
  [additionalProperties: string]: any;
}

export interface SpaceXModelLinks {
  articleLink?: string;
  missionPatch?: string;
  missionPatchSmall?: string;
}

export interface FilterModel {
  label: string;
  value: string;
}

export interface LaunchCardDetailsModel {
  label: string;
  value: string | string[];
  type?: LaunchDetailsValueType;
}

export enum LaunchDetailsValueType {
  string = 'string',
  list = 'list'
}
