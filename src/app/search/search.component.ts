import { Component, OnInit } from '@angular/core';
import { SearchService } from './';

@Component({
  templateUrl: 'search.component.html'
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }
}
