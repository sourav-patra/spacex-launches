import { FilterModel } from '../models/spacex.models';

export const DEVELOPER_NAME = 'Sourav Patra';

export const LAUNCH_YEARS = [
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020'
];

export const CONDITIONAL_FILTERS: FilterModel[] = [{
  label: 'True',
  value: 'true'
}, {
  label: 'False',
  value: 'false'
}];

export const VALID_QUERY_PARAMS = ['launchSuccess', 'launchYear', 'landSuccess'];