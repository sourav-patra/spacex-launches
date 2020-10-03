import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Observable, of } from "rxjs";
import { SpaceXModel } from "../../models/spacex.models";
import { SpacexService } from "../../services/spacex/spacex.service";
import { SpacexHomeComponent } from "./spacex-home.component";

describe("SpacexHomeComponent", () => {
  let component: SpacexHomeComponent;
  let fixture: ComponentFixture<SpacexHomeComponent>;

  const spaceXServiceSpy: jasmine.SpyObj<SpacexService> = jasmine.createSpyObj(
    SpacexService,
    ["launchDetailsObs", "loadingDetails"]
  );

  Object.defineProperty(spaceXServiceSpy, "launchDetailsObs", {
    get: (): Observable<boolean> => of(false),
  });

  Object.defineProperty(spaceXServiceSpy, "loadingDetails", {
    get: (): Observable<SpaceXModel[]> => of([]),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpacexHomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideProvider(SpacexService, { useValue: spaceXServiceSpy })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacexHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
