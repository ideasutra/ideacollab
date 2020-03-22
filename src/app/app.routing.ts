import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/index";
import { LoginComponent } from "./pages/login/index";
import { RegisterComponent } from "./pages/register/index";
import { ErrorComponent } from "./pages/error/error.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { AuthGuard } from "./core/guards/index";

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
