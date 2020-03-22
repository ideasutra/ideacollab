import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
import { AuthGuard } from "./core/guards/index";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./logout/logout.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "register", component: RegisterComponent },
  { path: "ideas_user", component: ErrorComponent },
  { path: "ideas_completed", component: ErrorComponent },
  { path: "ideas_popular", component: ErrorComponent },
  { path: "about", component: ErrorComponent },
  { path: "tipps", component: ErrorComponent },
  { path: "contact", component: ErrorComponent },
  { path: "dsgvo", component: ErrorComponent },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
