import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpacexService } from '../../services/spacex/spacex.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-spacex-home',
  templateUrl: './spacex-home.component.html',
  styleUrls: ['./spacex-home.component.scss']
})
export class SpacexHomeComponent implements OnInit, OnDestroy {

  public launchDetails$ = this.spaceXService.launchDetailsObs;
  private destroy$ = new Subject<boolean>();
  constructor(private spaceXService: SpacexService, private activatedRoute: ActivatedRoute) { }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Initial launch details
   */
  ngOnInit(): void {

    // this.activatedRoute.queryParams
    // .pipe(takeUntil(this.destroy$))
    // .subscribe({
    //   next: (params: Params): void => {
    //     if (Object.keys(params).length) {
    //       this.spaceXService.getLaunchDetails(params);
    //     }
    //   }
    // });
    // this.spaceXService.getLaunchDetails();
    this.spaceXService.getLaunchDetails();
  }

}
