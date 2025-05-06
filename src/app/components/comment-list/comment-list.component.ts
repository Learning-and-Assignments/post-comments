import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: any[] = [];
  loading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (this.postId) {
      this.loading = true;
      this.api.getCommentsByPost(this.postId).subscribe(comments => {
        this.comments = comments;
        this.loading = false;
      });
    }
  }
}