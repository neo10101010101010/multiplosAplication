import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiplosPage } from './multiplos.page';

describe('MultiplosPage', () => {
  let component: MultiplosPage;
  let fixture: ComponentFixture<MultiplosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
