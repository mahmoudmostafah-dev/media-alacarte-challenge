import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThePlatform } from './the-platform';

describe('ThePlatform', () => {
  let component: ThePlatform;
  let fixture: ComponentFixture<ThePlatform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThePlatform],
    }).compileComponents();

    fixture = TestBed.createComponent(ThePlatform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
