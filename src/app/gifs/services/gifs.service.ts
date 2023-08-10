import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private gifList: Gif[] = [];

  private _tagsHistory:string[] = [];

  private apiKey: string = 'mbSXlA2tRoY4skUAIeVYeIUISLet8DJ5';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory(): string[]{
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    //console.log(tag)
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag);

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length > 0)
      this.searchTag(this._tagsHistory[0]); // carga tags con el primer elemento de la lista de tags
  }

  searchTag(tag: string): void {
    if(tag.length < 1) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(
        resp => {
          //console.log(resp);
          this.gifList = resp.data;
          //console.log(this.gifList);
        }
      );
    //
  }

  get gifs(): Gif[]{
    return this.gifList;
  }
}
