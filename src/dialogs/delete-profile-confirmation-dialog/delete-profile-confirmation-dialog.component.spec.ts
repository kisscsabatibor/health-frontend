import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileConfirmationDialogComponent } from './delete-profile-confirmation-dialog.component';

describe('DeleteProfileConfirmationDialogComponent', () => {
  let component: DeleteProfileConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteProfileConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProfileConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProfileConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
