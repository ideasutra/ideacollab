import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BootstrapModule } from "./bootstrap.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/index";
import { LayoutComponent } from "./layout/index";
import { LoginComponent } from "./login/index";
import { RegisterComponent } from "./register/index";
import { routing } from "./app.routing";
import { CoreModule } from "./core/core.module";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthenticationService } from "./core/services";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    LayoutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    BootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    routing
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
