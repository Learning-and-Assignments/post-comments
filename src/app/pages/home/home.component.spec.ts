import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  template: '<button (click)="selectUser()">Select</button>'
})
class MockUserListComponent {
  selectUser() { }
}

@Component({
  selector: 'app-post-list',
  template: '<div>Post list for user</div>'
})
class MockPostListComponent {
  userId!: number;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockUserListComponent,
        MockPostListComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedUserId when onUserSelected is called', () => {
    expect(component.selectedUserId).toBeNull();
    component.onUserSelected(5);
    expect(component.selectedUserId).toBe(5);
  });

  it('should conditionally show post list when selectedUserId is set', () => {
    component.selectedUserId = 3;
    fixture.detectChanges();

    const postList = fixture.debugElement.query(By.css('app-post-list'));
    expect(postList).toBeTruthy();
  });
});
