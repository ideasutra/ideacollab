import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { appConfig } from '../../app.config';
import { Tag } from '../models/index';

@Injectable()
export class TagService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Tag[]>(appConfig.apiUrl + '/tags').pipe(
      map((tags: any) => {
        return tags.data;
      })
    );
  }

  getById(_id: string) {
    return this.http.get<Tag>(appConfig.apiUrl + '/tag/' + _id).pipe(
      map((tags: any) => {
        return tags.data;
      })
    );
  }

  create(tag: Tag) {
    return this.http.post(appConfig.apiUrl + '/tags', tag);
  }

  update(tag: Tag) {
    return this.http.put(appConfig.apiUrl + '/tag/' + tag._id, tag);
  }

  delete(_id: string) {
    return this.http.delete(appConfig.apiUrl + '/tag/' + _id);
  }
}
