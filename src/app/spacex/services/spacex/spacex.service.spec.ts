import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, throwError } from "rxjs";
import { HttpService } from "src/app/core/services/http/http.service";
import { launchDetails } from "src/app/shared/mocks/spacex-launches";
import { SpaceXModel } from "../../models/spacex.models";
import { SpacexService } from "./spacex.service";

describe("SpacexService", () => {
  let service: SpacexService;

  const httpSpy: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    HttpService,
    ["fetchData"]
  );

  // httpSpy.fetchData.and.returnValue(of());
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).overrideProvider(HttpService, { useValue: httpSpy });
    service = TestBed.inject(SpacexService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getLaunchDetails", () => {
    it("should set the launch details list on success", () => {
      spyOn(service, "showLoading");
      spyOn(service, "hideLoading");
      httpSpy.fetchData.and.returnValue(of(launchDetails));
      service.launchDetailsObs.subscribe({
        next: (response: SpaceXModel[]): void => {
          if (response?.length) {
            // test if properly set
            expect(response).toBeDefined();
            // test if length is same as the mock server response
            expect(response.length).toEqual(launchDetails.length);
          }
        },
        complete: (): void => {
          expect(service.hideLoading).toHaveBeenCalledTimes(1);
        },
      });
      service.getLaunchDetails();
      expect(service.showLoading).toHaveBeenCalledTimes(1);
    });

    it("should hide loading even on error", () => {
      spyOn(service, "showLoading");
      spyOn(service, "hideLoading");
      httpSpy.fetchData.and.returnValue(throwError(null));
      service.launchDetailsObs.subscribe({
        error: (): void => {
          expect(service.hideLoading).toHaveBeenCalledTimes(1);
        },
      });
      service.getLaunchDetails();
      expect(service.showLoading).toHaveBeenCalledTimes(1);
    });
  });
});
