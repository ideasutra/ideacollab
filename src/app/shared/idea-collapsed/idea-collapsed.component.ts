import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

import { Idea } from "../../core/models/index";
import { Router } from "@angular/router";

@Component({
  selector: "app-idea-collapsed",
  templateUrl: "./idea-collapsed.component.html",
  styleUrls: ["./idea-collapsed.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaCollapsedComponent implements OnInit {
  @Input("idea") idea: Idea;

  constructor(private router: Router) {}

  ngOnInit() {}

  public navigateToDetails(): void {
    this.router.navigate(["idea_details", this.idea._id]);
  }
}
