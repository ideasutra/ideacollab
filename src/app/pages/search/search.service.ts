import { Injectable } from '@angular/core';
import { IdeaService, CategoryService, TagService } from 'app/core/services';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private ideaService: IdeaService, private categoryService: CategoryService, private tagService: TagService) { }
}
