import { Component, OnInit } from "@angular/core";
import {
  IdeaService,
  FeedbackService,
  AuthenticationService
} from "app/core/services";
import { ActivatedRoute } from "@angular/router";
import { Feedback, Idea } from "app/core/models";

@Component({
  templateUrl: "./idea-details.component.html",
  styleUrls: ["./idea-details.component.scss"]
})
export class IdeaDetailsComponent implements OnInit {
  public idea: Idea;
  public feedbacks: Array<Feedback>;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private feedbackService: FeedbackService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params["idea_id"];
      this.ideaService.getById(id).subscribe(x => (this.idea = x));
      this.feedbackService.getByIdea(id).subscribe(x => (this.feedbacks = x));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public addNewFeedback(text) {
    let feedback = new Feedback();
    feedback._idea_id = this.idea._id;
    if (this.authenticationService.isAuthenticated()) {
      feedback._user = this.authenticationService.currentUser;
    }
    feedback.content = text;

    this.feedbackService
      .create(feedback)
      .subscribe(x => this.feedbacks.push((x as any).data));
  }

  public trackByFn(index, item) {
    return item._id; // or item.id
  }
}
