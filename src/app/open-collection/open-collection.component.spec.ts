import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCollectionComponent } from './open-collection.component';

describe('OpenCollectionComponent', () => {
  let component: OpenCollectionComponent;
  let fixture: ComponentFixture<OpenCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
