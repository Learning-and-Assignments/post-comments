import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getPostsByUser']);

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [{ provide: ApiService, useValue: spy }]
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    component.userId = 1;
  });

  it('should load first 3 posts on input change', () => {
    const mockPosts = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, title: `Title ${i}`, body: `Body ${i}` }));
    apiServiceSpy.getPostsByUser.and.returnValue(of(mockPosts));

    component.ngOnChanges();
    fixture.detectChanges();

    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles.length).toBe(3);
  });

  it('should expand a post to show comments', () => {
    component.posts = [{ id: 1, title: 'T', body: 'B' }];
    component.displayedPosts = component.posts;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click');

    expect(component.expandedPostId).toBe(1);
  });
});
