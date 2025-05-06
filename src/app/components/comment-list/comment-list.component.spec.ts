import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentListComponent } from './comment-list.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getCommentsByPost']);

    await TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      providers: [{ provide: ApiService, useValue: spy }]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.postId = 1;
  });

  it('should fetch and render comments', () => {
    const mockComments = [{ id: 1, name: 'C1', body: 'B1' }];
    apiServiceSpy.getCommentsByPost.and.returnValue(of(mockComments));

    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('li'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent).toContain('C1');
  });
});
