import { Component, OnInit } from '@angular/core';
import { NasaApiService, Post } from 'src/app/services/nasa-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apod!: Post[];

  constructor(private nasaApiService: NasaApiService) {}

  async ngOnInit(): Promise<void> {
    this.apod = await this.nasaApiService.getAPOD();
  }
}
