import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Observable, of, Subject } from "rxjs";
import { SpaceXModel } from "../../models/spacex.models";
import { SpacexService } from "../../services/spacex/spacex.service";
import { FilterComponent } from "./filter.component";

describe("FilterComponent", () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  const spaceXServiceSpy: jasmine.SpyObj<SpacexService> = jasmine.createSpyObj(
    SpacexService,
    ["loadingDetails", "getLaunchDetails"]
  );

  Object.defineProperty(spaceXServiceSpy, "loadingDetails", {
    get: (): Observable<SpaceXModel[]> => of([]),
  });

  const mockActivatedRoute: any = {
    queryParams: new Subject<Params>(),
  };

  const mockRouterSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj(Router, [
    "navigate",
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    })
      .overrideProvider(Router, { useValue: mockRouterSpy })
      .overrideProvider(SpacexService, { useValue: spaceXServiceSpy })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should prepare the filter data", () => {
      spyOn(component, "checkQueryParams");
      component.ngOnInit();
      expect(component.yearFilters).toBeDefined();
      expect(component.launchFilters).toBeDefined();
      expect(component.landingFilters).toBeDefined();
    });

    describe("checkQueryParams", () => {
      beforeEach(() => spaceXServiceSpy.getLaunchDetails.calls.reset());

      it("should fetch the card details if params are valid", () => {
        const validQueryParams: Params = {
          launchYear: 2000,
        };
        expect(component.selectedQueryParams).toBeUndefined();
        mockActivatedRoute.queryParams.next(validQueryParams);
        component.ngOnInit();
        expect(component.selectedQueryParams).toEqual(validQueryParams);
        expect(spaceXServiceSpy.getLaunchDetails).toHaveBeenCalledTimes(1);
      });

      it("should show 404 page if query params are invalid", () => {
        const invalidQueryParams: Params = {
          invalidFilter: true,
        };
        mockActivatedRoute.queryParams.next(invalidQueryParams);
        component.ngOnInit();
        expect(component.selectedQueryParams).toBeUndefined();
        expect(spaceXServiceSpy.getLaunchDetails).toHaveBeenCalledTimes(0);
        expect(mockRouterSpy.navigate).toHaveBeenCalledWith(["/404"]);
      });
    });
  });
});
