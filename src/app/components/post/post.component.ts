import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() data: Post = {};

  public isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}
}
