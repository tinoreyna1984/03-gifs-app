import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  private hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.url)
      throw new Error('URL is required.');
  }

  onLoad(): void {
    console.log("loaded...");
    this.hasLoaded = true;
  }

  get loadStatus(): boolean {
    return this.hasLoaded;
  }

}
