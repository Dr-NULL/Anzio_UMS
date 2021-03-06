import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-proj-tarjet',
  templateUrl: './proj-tarjet.component.html',
  styleUrls: ['./proj-tarjet.component.scss']
})
export class ProjTarjetComponent implements OnInit {
  @Input()
  img: string;

  @Input()
  url: string;

  @Input()
  color = '';

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
    if (this.url.match(/^https?:\/\//gi) === null) {
      this.url = 'http:\/\/' + this.url;
    }
  }
}
