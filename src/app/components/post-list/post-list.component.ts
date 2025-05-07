import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnChanges {
  @Input() userId!: number;
  posts: any[] = [];
  displayedPosts: any[] = [];
  loading = false;
  showAll = false;
  expandedPostId: number | null = null;

  constructor(private api: ApiService) { }

  ngOnChanges() {
    if (this.userId) {
      this.loading = true;
      this.api.getPostsByUser(this.userId).subscribe(posts => {
        this.posts = posts;
        this.displayedPosts = posts.slice(0, 3);
        this.showAll = false;
        this.loading = false;
      });
    }
  }

  loadAll() {
    this.displayedPosts = this.posts;
    this.showAll = true;
  }

  // expandPost(postId: number) {
  //   this.expandedPostId = postId;
  // }

  expandPost(postId: number): void {
    this.expandedPostId = this.expandedPostId === postId ? null : postId;
  }
}
