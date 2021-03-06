﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

import { appConfig } from "../../app.config";
import { User } from "../models";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public currentUser: User;
  public isAuthenticated() {
    return this.currentUser != null;
  }

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(appConfig.apiUrl + "/user/authenticate", {
        username: username,
        password: password
      })
      .pipe(
        map(user => {
          // login successful if there"s a jwt token in the response
          if (user && user.data && user.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (typeof window !== "undefined") {
              localStorage.setItem("currentUser", JSON.stringify(user.data));
              this.currentUser = user.data;
            }
          }

          return user.data;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      this.currentUser = null;
    }
  }
}
