import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavPillComponent } from './nav-pill.component';

describe('NavPillComponent', () => {
  let component: NavPillComponent;
  let fixture: ComponentFixture<NavPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange if valid page number is given', () => {
    const emitSpy = jest.spyOn(component.feedChange, 'emit');
    component.selectFeed("beststories");
    expect(emitSpy).toHaveBeenCalledWith("beststories");
  });
});
