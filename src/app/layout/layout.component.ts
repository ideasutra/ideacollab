import { Component, OnInit, DoCheck } from "@angular/core";
import { User } from "app/core/models";
import { AuthenticationService } from "app/core/services";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit, DoCheck {
  public currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = authenticationService.currentUser;
  }

  ngOnInit() {}

  ngDoCheck() {
    this.currentUser = this.authenticationService.currentUser;
  }
}
