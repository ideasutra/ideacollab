import { Component, OnInit } from '@angular/core';

import { Idea } from '../core/models/index';
import { IdeaService } from '../core/services/index';

@Component({
  templateUrl: 'idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {
  ideas: Idea[] = [];

  constructor(private ideaService: IdeaService) {
  }

  ngOnInit() {
    this.loadAllIdeas();
  }

  deleteIdea(_id: string) {
    this.ideaService.delete(_id).subscribe(() => {
      this.loadAllIdeas();
    });
  }

  private loadAllIdeas() {
    this.ideaService.getAll().subscribe(ideas => {
      this.ideas = ideas;
    });
  }
}
