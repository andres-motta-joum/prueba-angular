import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationComponentComponent } from './publication-component.component';

describe('PublicationComponentComponent', () => {
  let component: PublicationComponentComponent;
  let fixture: ComponentFixture<PublicationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationComponentComponent]
    });
    fixture = TestBed.createComponent(PublicationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
