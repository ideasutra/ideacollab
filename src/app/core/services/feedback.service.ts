import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { appConfig } from "../../app.config";
import { Feedback } from "../models/index";

@Injectable()
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Feedback[]>(appConfig.apiUrl + "/feedbacks").pipe(
      map((feedbacks: any) => {
        return feedbacks.data;
      })
    );
  }

  getById(_id: string) {
    return this.http.get<Feedback>(appConfig.apiUrl + "/feedback/" + _id).pipe(
      map((feedbacks: any) => {
        return feedbacks.data;
      })
    );
  }

  getByIdea(_idea_id: string) {
    return this.http
      .get<Feedback>(appConfig.apiUrl + "/idea/" + _idea_id + "/feedbacks")
      .pipe(
        map((feedbacks: any) => {
          return feedbacks.data;
        })
      );
  }

  create(feedback: Feedback) {
    return this.http.post(appConfig.apiUrl + "/feedbacks", feedback);
  }

  update(feedback: Feedback) {
    return this.http.put(
      appConfig.apiUrl + "/feedback/" + feedback._id,
      feedback
    );
  }

  delete(_id: string) {
    return this.http.delete(appConfig.apiUrl + "/feedback/" + _id);
  }
}
