import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing'
import { of } from 'rxjs'
import { DoctorsComponent } from './doctors.component'
import { UserService } from '../../services/user/user.service'
import { AssignmentService } from '../../services/assignment/assignment.service'
import { User } from '../../services/user/user'

describe('DoctorsComponent', () => {
  let component: DoctorsComponent
  let fixture: ComponentFixture<DoctorsComponent>
  let mockUserService: jasmine.SpyObj<UserService>
  let mockAssignmentService: jasmine.SpyObj<AssignmentService>

  const mockDoctors: User[] = [
    { _id: '1', name: 'Doctor 1' } as User,
    { _id: '2', name: 'Doctor 2' } as User,
  ]

  const mockAssignedDoctors: User[] = [{ _id: '1', name: 'Doctor 1' } as User]

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getDoctors'])
    mockAssignmentService = jasmine.createSpyObj('AssignmentService', [
      'getAssignedDoctors',
      'createAssignment',
      'deleteAssignment',
    ])

    await TestBed.configureTestingModule({
      imports: [DoctorsComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AssignmentService, useValue: mockAssignmentService },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DoctorsComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch doctors and assigned doctors on init', fakeAsync(() => {
    mockUserService.getDoctors.and.returnValue(of(mockDoctors))
    mockAssignmentService.getAssignedDoctors.and.returnValue(
      of(mockAssignedDoctors),
    )

    component.ngOnInit()
    tick()

    expect(component.doctors).toEqual(mockDoctors)
    expect(component.assignedDoctors).toEqual(mockAssignedDoctors)
    expect(mockUserService.getDoctors).toHaveBeenCalled()
    expect(mockAssignmentService.getAssignedDoctors).toHaveBeenCalled()
  }))

  it('should return true if doctor is assigned', () => {
    component.assignedDoctors = mockAssignedDoctors
    const doctor = mockDoctors[0]
    expect(component.isAssigned(doctor)).toBeTrue()
  })

  it('should return false if doctor is not assigned', () => {
    component.assignedDoctors = mockAssignedDoctors
    const doctor = mockDoctors[1]
    expect(component.isAssigned(doctor)).toBeFalse()
  })

  it('should set messageState to success when createAssignment succeeds', fakeAsync(() => {
    const doctor = mockDoctors[1]
    mockAssignmentService.createAssignment.and.returnValue(of({ error: null }))
    mockUserService.getDoctors.and.returnValue(of(mockDoctors))
    mockAssignmentService.getAssignedDoctors.and.returnValue(
      of(mockAssignedDoctors),
    )

    component.createAssignment(doctor)
    tick()

    expect(component.messageState).toBe('success')
    expect(mockAssignmentService.createAssignment).toHaveBeenCalledWith(
      doctor._id,
    )
  }))

  it('should set messageState to error when createAssignment fails', fakeAsync(() => {
    const doctor = mockDoctors[1]
    mockAssignmentService.createAssignment.and.returnValue(
      of({ error: 'Some error' }),
    )
    mockUserService.getDoctors.and.returnValue(of(mockDoctors))
    mockAssignmentService.getAssignedDoctors.and.returnValue(
      of(mockAssignedDoctors),
    )

    component.createAssignment(doctor)
    tick()

    expect(component.messageState).toBe('error')
  }))

  it('should set messageState to success when deleteAssignment succeeds', fakeAsync(() => {
    const doctor = mockDoctors[0]
    mockAssignmentService.deleteAssignment.and.returnValue(of({ error: null }))
    mockUserService.getDoctors.and.returnValue(of(mockDoctors))
    mockAssignmentService.getAssignedDoctors.and.returnValue(
      of(mockAssignedDoctors),
    )

    component.deleteAssignment(doctor)
    tick()

    expect(component.messageState).toBe('success')
    expect(mockAssignmentService.deleteAssignment).toHaveBeenCalledWith(
      doctor._id,
    )
  }))

  it('should set messageState to error when deleteAssignment fails', fakeAsync(() => {
    const doctor = mockDoctors[0]
    mockAssignmentService.deleteAssignment.and.returnValue(
      of({ error: 'Some error' }),
    )
    mockUserService.getDoctors.and.returnValue(of(mockDoctors))
    mockAssignmentService.getAssignedDoctors.and.returnValue(
      of(mockAssignedDoctors),
    )

    component.deleteAssignment(doctor)
    tick()

    expect(component.messageState).toBe('error')
  }))
})
