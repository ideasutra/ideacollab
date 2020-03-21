import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { appConfig } from '../../app.config';
import { Category } from '../models/index';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(appConfig.apiUrl + '/categories').pipe(
      map((categories: any) => {
        return categories.data;
      })
    );
  }

  getById(_id: string) {
    return this.http.get<Category>(appConfig.apiUrl + '/category/' + _id).pipe(
      map((categories: any) => {
        return categories.data;
      })
    );
  }

  create(category: Category) {
    return this.http.post(appConfig.apiUrl + '/categories', category);
  }

  update(category: Category) {
    return this.http.put(appConfig.apiUrl + '/category/' + category._id, category);
  }

  delete(_id: string) {
    return this.http.delete(appConfig.apiUrl + '/category/' + _id);
  }
}
