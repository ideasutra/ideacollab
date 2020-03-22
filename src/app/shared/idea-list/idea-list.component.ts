import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { Idea } from "app/core/models";

@Component({
  selector: "app-idea-list",
  templateUrl: "./idea-list.component.html",
  styleUrls: ["./idea-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaListComponent implements OnInit {
  @Input("ideas") ideas: Array<Idea>;

  constructor() {}

  ngOnInit(): void {}

  public trackByFn(index, item) {
    return item._id; // or item.id
  }
}
