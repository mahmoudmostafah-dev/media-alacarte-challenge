import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDemo } from './request-demo';

describe('RequestDemo', () => {
  let component: RequestDemo;
  let fixture: ComponentFixture<RequestDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
