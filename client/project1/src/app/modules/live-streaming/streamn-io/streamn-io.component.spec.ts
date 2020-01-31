import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamnIOComponent } from './streamn-io.component';

describe('StreamnIOComponent', () => {
  let component: StreamnIOComponent;
  let fixture: ComponentFixture<StreamnIOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamnIOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamnIOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
