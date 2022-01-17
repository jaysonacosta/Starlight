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
    await this.refreshData();
  }
  async refreshData(): Promise<void> {
    if (localStorage.length !== 0) {
      const data = localStorage.getItem('data');
      if (data) {
        const dataJSON = JSON.parse(data);
        const storedDate = dataJSON[0].date;
        const today = new Date()
          .toLocaleDateString('en-GB')
          .split('/')
          .reverse()
          .join('-');
        if (storedDate === today) {
          this.apod = dataJSON;
          return;
        }
      }
    }
    localStorage.removeItem('data');
    this.apod = await this.nasaApiService.getAPOD();
    localStorage.setItem('data', JSON.stringify(this.apod));
  }
  postLiked(data: Post): void {
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(this.apod));
  }
}
