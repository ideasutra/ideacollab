import { Component, OnInit } from "@angular/core";

import { User, Idea } from "../../core/models/index";
import { UserService, IdeaService } from "../../core/services/index";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  ideas: Idea[] = [];

  constructor(
    private userService: UserService,
    private ideaService: IdeaService
  ) {
    if (typeof window !== "undefined") {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
  }

  ngOnInit() {
    this.loadAllUsers();
    this.loadAllIdeas();
  }

  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  private loadAllIdeas() {
    this.ideaService.getAll().subscribe(ideas => {
      this.ideas = ideas;
    });
  }
}
