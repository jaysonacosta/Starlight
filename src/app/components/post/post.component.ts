import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: Post = {};
  @Output() likedPost = new EventEmitter<Post>();

  public isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}

  likePost(data: Post): void {
    this.data.liked = !this.data.liked;
    this.likedPost.emit(data);
  }
}
