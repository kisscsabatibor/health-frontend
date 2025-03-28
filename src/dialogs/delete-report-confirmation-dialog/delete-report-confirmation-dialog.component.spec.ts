import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReportConfirmationDialogComponent } from './delete-report-confirmation-dialog.component';

describe('DeleteReportConfirmationDialogComponent', () => {
  let component: DeleteReportConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteReportConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteReportConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReportConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
