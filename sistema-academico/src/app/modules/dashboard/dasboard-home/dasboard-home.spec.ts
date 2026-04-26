import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardHome } from './dasboard-home';

describe('DasboardHome', () => {
  let component: DasboardHome;
  let fixture: ComponentFixture<DasboardHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardHome],
    }).compileComponents();

    fixture = TestBed.createComponent(DasboardHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
