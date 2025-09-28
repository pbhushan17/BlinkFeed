import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
     component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pages when totalPages changes', () => {
    component.totalPages = 5;

    component.ngOnChanges();

    expect(component['pages']).toEqual([1, 2, 3, 4, 5]);
  });

  it('should emit pageChange if valid page number is given', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');

    component.goToPage(3);

    expect(emitSpy).toHaveBeenCalledWith(3);
  });

    it('should NOT emit if page is less than 1', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');

    component.goToPage(0);

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
