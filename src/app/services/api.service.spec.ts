import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch posts by user', () => {
    const userId = 1;
    const mockPosts = [{ id: 1, userId, title: 'Post', body: 'Body' }];

    service.getPostsByUser(userId).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch comments by post', () => {
    const postId = 1;
    const mockComments = [{ id: 1, postId, name: 'Comment', body: 'Nice' }];

    service.getCommentsByPost(postId).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});
