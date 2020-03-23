import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

import { Idea, Feedback } from "../../core/models/index";

@Component({
  selector: "app-idea",
  templateUrl: "./idea.component.html",
  styleUrls: ["./idea.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaComponent implements OnInit {
  @Input("idea") idea: Idea;
  @Output() sendFeedback: EventEmitter<any> = new EventEmitter();
  public currentFeedback: string;

  constructor() {}

  ngOnInit() {}

  addFeedback(event) {
    if (this.currentFeedback) {
      this.sendFeedback.emit(this.currentFeedback);
    }
    this.currentFeedback = "";
  }
}
