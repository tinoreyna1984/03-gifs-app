import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService){
  }

  get tagsHistory(): string[] {
    return this.gifsService.tagsHistory;
  }

  // click en el tag del sidebar para buscar los gifs
  public getGifsFromTag(tag: string): void{
    return this.gifsService.searchTag(tag);
  }

}
