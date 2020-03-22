import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BootstrapModule } from "./bootstrap.module";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { CoreModule } from "./core/core.module";

import { AuthenticationService } from "./core/services";

// Pages
import { HomeComponent } from "./pages/home/index";
import { LoginComponent } from "./pages/login/index";
import { RegisterComponent } from "./pages/register/index";
import { ErrorComponent } from "./pages/error/error.component";
import { LogoutComponent } from "./pages/logout/logout.component";

// Shared
import { IdeaComponent } from "./shared/idea/idea.component";
import { IdeaNewComponent } from "./shared/idea-new/idea-new.component";
import { IdeaListComponent } from "./shared/idea-list/idea-list.component";
import { TagComponent } from "./shared/tag/tag.component";

// Other components
import { LayoutComponent } from "./layout/index";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    LayoutComponent,
    ErrorComponent,
    IdeaComponent,
    IdeaNewComponent,
    IdeaListComponent,
    TagComponent
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
