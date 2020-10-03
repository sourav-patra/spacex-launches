/*
 * __author__ = 'Sourav Prakash Patra'
 * Service dedicated to handle requests and responses for spacex APIs
 */
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Params } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { delay, map, retry, takeUntil, tap } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http/http.service";
import {
  snakeToCamelCase,
  stringCamelToSnake,
} from "../../../core/utils/string-util";
import { SpaceXModel, SpaceXParams } from "../../models/spacex.models";

@Injectable({
  providedIn: "root",
})
export class SpacexService implements OnDestroy {
  private loadingDetails$ = new BehaviorSubject<boolean>(false);
  get loadingDetails(): Observable<boolean> {
    return this.loadingDetails$.asObservable();
  }
  private launchDetailsSub$ = new BehaviorSubject<SpaceXModel[]>(null);
  get launchDetailsObs(): Observable<SpaceXModel[]> {
    return this.launchDetailsSub$.asObservable();
  }
  private destroy$ = new Subject<boolean>();
  constructor(private httpService: HttpService) {}

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
  public setLaunchDetails(spaceXLaunchDetailsResponse: SpaceXModel[]): void {
    this.launchDetailsSub$.next(spaceXLaunchDetailsResponse);
  }

  /**
   * Show loading spinner
   */
  public showLoading(): void {
    this.loadingDetails$.next(true);
  }

  /**
   * Hide loading spinner
   */
  public hideLoading(): void {
    this.loadingDetails$.next(false);
  }

  /**
   * Get the launch details with added parameters if provided
   * @param requestParams optional parameters
   */
  getLaunchDetails(requestParams?: SpaceXParams | Params): void {
    let httpParams: HttpParams = new HttpParams().set("limit", "100");
    if (requestParams) {
      Object.keys(requestParams).forEach((param: string): void => {
        httpParams = httpParams.append(
          stringCamelToSnake(param),
          requestParams[param]
        );
      });
    }
    this.showLoading();
    this.httpService
      .fetchData(`/v3/launches`, httpParams)
      .pipe(
        map((response: unknown) => snakeToCamelCase(response)),
        tap((launchDetailsServer: SpaceXModel[]): void =>
          this.setLaunchDetails(launchDetailsServer)
        ),
        retry(3),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: (): void => this.hideLoading(),
        error: (error: HttpErrorResponse): void => {
          this.hideLoading();
          // Should ideally be logged via a logger service
          // Or shown gracefully using notifications/toast
          console.log(error);
        },
      });
  }
}
