/*
 * __author__ = 'Sourav Prakash Patra'
 * Service dedicated to handle requests and responses for spacex APIs
 */
import { Injectable, OnDestroy } from '@angular/core';
import { SpaceXRequestParams, SpaceXModel } from '../../models/spacex.models';
import { HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { snakeToCamelCase, stringCamelToSnake } from '../../../core/utils/string-util';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SpacexService implements OnDestroy {

  requestParams: HttpParams = new HttpParams().set('limit', '100');
  private launchDetailsSub$ = new Subject<SpaceXModel[]>();
  get launchDetailsObs(): Observable<SpaceXModel[]> {
    return this.launchDetailsSub$.asObservable();
  }
  private destroy$ = new Subject<boolean>();
  constructor(private httpService: HttpService) { }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Set the launch details provided by response in the data stream
   * @param spaceXLaunchDetailsResponse response from server
   */
  public setLaunchDetails(spaceXLaunchDetailsResponse: SpaceXModel[]) {
    this.launchDetailsSub$.next(spaceXLaunchDetailsResponse);
  }

  /**
   * Add more params to the request
   * @param paramKey key of param
   * @param paramValue value of param
   */
  public appendParams(paramKey: string, paramValue: string): void {
    this.requestParams = this.requestParams.append(paramKey, paramValue);
  }

  /**
   * Get the launch details with added parameters if provided
   * @param requestParams optional parameters
   */
  getLaunchDetails(requestParams?: SpaceXRequestParams): void {
    if (requestParams) {
      Object.keys(requestParams).forEach((param: string): void => {
        this.appendParams(stringCamelToSnake(param), requestParams[param]);
      });
    }
    this.httpService.fetchData(`/v3/launches`, this.requestParams).pipe(
      map((response: unknown) => snakeToCamelCase(response)),
      tap((launchDetailsServer: SpaceXModel[]): void => this.setLaunchDetails(launchDetailsServer)),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
