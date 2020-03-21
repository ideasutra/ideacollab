import { Component, OnInit } from '@angular/core';
import { SearchService } from './';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private ideaService: SearchService) {
  }

  ngOnInit() {
  }
}
