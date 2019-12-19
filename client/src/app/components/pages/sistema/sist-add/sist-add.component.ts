import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sist-add',
  templateUrl: './sist-add.component.html',
  styleUrls: ['./sist-add.component.scss']
})
export class SistAddComponent implements OnInit {
  files: File[] = [];

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    console.log(this.files);
  }
}
