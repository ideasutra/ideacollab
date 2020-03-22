import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { appConfig } from "../../app.config";
import { Idea } from "../models/index";

@Injectable()
export class IdeaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Idea[]>(appConfig.apiUrl + "/ideas").pipe(
      map((ideas: any) => {
        return ideas.data;
      })
    );
  }

  getById(_id: string) {
    return this.http.get<Idea>(appConfig.apiUrl + "/idea/" + _id).pipe(
      map((ideas: any) => {
        return ideas.data;
      })
    );
  }

  create(idea: Idea) {
    return this.http.post(appConfig.apiUrl + "/ideas", idea);
  }

  update(idea: Idea) {
    return this.http.put(appConfig.apiUrl + "/idea/" + idea._id, idea);
  }

  delete(_id: string) {
    return this.http.delete(appConfig.apiUrl + "/idea/" + _id);
  }
}
