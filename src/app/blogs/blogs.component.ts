import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  breakpoint: number = 0;
  rowHeight:any;
  constructor() { }

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 400 ? 2 : window.innerWidth <= 700 ? 4 : window.innerWidth <= 1000 ? 4 : window.innerWidth >= 1000 ? 8 : 2;
    this.rowHeight =window.innerWidth <= 789 ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = window.innerWidth <= 400 ? 2 : window.innerWidth <= 700 ? 4 : window.innerWidth <= 1000 ? 4 : window.innerWidth >= 1000 ? 8 : 2;
    this.rowHeight = event.target.innerWidth <= 789 ? 1 : 2;
  }

  tiles: Tile[] = [
    {text: 'Two', cols: 4, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 4, rows: 1, color: 'lightpink'},
  ];

}
