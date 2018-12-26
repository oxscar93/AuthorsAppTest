import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationBrowserComponent } from './publication-browser.component';

describe('PublicationBrowserComponent', () => {
  let component: PublicationBrowserComponent;
  let fixture: ComponentFixture<PublicationBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
