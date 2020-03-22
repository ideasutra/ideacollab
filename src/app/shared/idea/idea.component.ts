import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";

import { Idea } from "../../core/models/index";

@Component({
  selector: "app-idea",
  templateUrl: "./idea.component.html",
  styleUrls: ["./idea.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaComponent implements OnInit {
  @Input("idea") idea: Idea;

  constructor() {}

  ngOnInit() {}
}
