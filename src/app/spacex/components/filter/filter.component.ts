import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterModel, SpaceXParams } from '../../models/spacex.models';
import * as CONST from '../../constants/spacex.constants';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SpacexService } from '../../services/spacex/spacex.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  selectedQueryParams: SpaceXParams;
  yearFilters: FilterModel[];
  launchFilters: FilterModel[];
  landingFilters: FilterModel[];
  destroy$ = new Subject<boolean>();
  loading$ = this.spaceXService.loadingDetails;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private spaceXService: SpacexService) { }

  ngOnInit(): void {
    this.yearFilters = this.prepareFilters(CONST.LAUNCH_YEARS);
    this.launchFilters = [...CONST.CONDITIONAL_FILTERS];
    this.landingFilters = [...CONST.CONDITIONAL_FILTERS];
    this.checkQueryParams();
  }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Function to check for query params
   * and trigger refresh if they change
   * Also check for invalid params
   */
  public checkQueryParams(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (routeQueryParams: Params): void => {
        // handle invalid parameters
        if (this.checkIfQueryParamIsInvalid(routeQueryParams)) {
          this.router.navigate(['/404']);
        } else {
          this.selectedQueryParams = {...routeQueryParams};
          this.spaceXService.getLaunchDetails(routeQueryParams);
        }
      }
    });
  }

  /**
   * Prepare constants for year filters
   * @param constants types of year filters as constants
   */
  public prepareFilters(constants: string[]): FilterModel[] {
    return constants.map((year: string): FilterModel => {
      return {
        label: `${year}`,
        value: year
      };
    });
  }

  /**
   * Select Year Filter
   */
  public selectYear(filterValue: number): void {
    this.selectedQueryParams.launchYear = this.selectedQueryParams.launchYear === filterValue ? null : filterValue;
    this.updateNavigationAndFetchLaunchDetails({
      launchYear: this.selectedQueryParams.launchYear
    });
  }

  /**
   * Select Launch Filter
   */
  public selectLaunch(filterValue: boolean): void {
    this.selectedQueryParams.launchSuccess = this.selectedQueryParams.launchSuccess === filterValue ? null : filterValue;
    this.updateNavigationAndFetchLaunchDetails({
      launchSuccess: this.selectedQueryParams.launchSuccess
    });
  }

  /**
   * Select Landing Filter
   */
  public selectLanding(filterValue: boolean): void {
    this.selectedQueryParams.landSuccess = this.selectedQueryParams.landSuccess === filterValue ? null :  filterValue;
    this.updateNavigationAndFetchLaunchDetails({
      landSuccess: this.selectedQueryParams.landSuccess
    });
  }

  /**
   * Add or remove query params based on filters
   * without changing the view
   * @param queryParams params to be added in the route path
   */
  public updateNavigationAndFetchLaunchDetails(queryParams: Params) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge'
     });
  }

  /**
   * Function to check if any of the query params
   * passed in the route are invalid
   * @param queryParams Query params present in the route
   */
  public checkIfQueryParamIsInvalid(queryParams: Params): boolean {
    const keysArray: string[] = Object.keys(queryParams);
    return keysArray.length && keysArray.some(queryKey => !CONST.VALID_QUERY_PARAMS.includes(queryKey));
  }

}
