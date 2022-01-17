import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NasaApiService {
  apiHost = 'https://api.nasa.gov/';
  apiKey = environment.apiKey;

  startDate = '';
  endDate = '';

  constructor(private http: HttpClient) {
    const date = new Date();
    this.endDate = date
      .toLocaleDateString('en-GB')
      .split('/')
      .reverse()
      .join('-');
    date.setMonth(date.getMonth() - 1);
    this.startDate = date
      .toLocaleDateString('en-GB')
      .split('/')
      .reverse()
      .join('-');
  }

  async getAPOD(): Promise<Post[]> {
    const entries: Post[] = [];
    const result = await this.http
      .get<any>(
        `${this.apiHost}planetary/apod?api_key=${this.apiKey}&start_date=${this.startDate}&end_date=${this.endDate}`
      )
      .toPromise();
    for (const entry of result) {
      if (result) {
        const apod: Post = {
          title: entry.title,
          explanation: entry.explanation,
          date: entry.date,
          copyright: entry.copyright,
          hdurl: entry.hdurl,
          liked: false,
        };
        entries.unshift(apod);
      }
    }
    return entries;
  }
}

export interface Post {
  title?: string;
  explanation?: string;
  date?: string;
  copyright?: string;
  hdurl?: string;
  liked?: boolean;
}
