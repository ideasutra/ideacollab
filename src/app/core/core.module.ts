import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import {
  AlertComponent,
  AlertService,
  ValidationMessagesComponent,
  ValidationService
} from "./components/index";
import { AuthGuard } from "./guards/index";
import {
  JwtInterceptorProvider,
  ErrorInterceptorProvider
} from "./helpers/index";
import { AuthenticationService, UserService, IdeaService, CategoryService, TagService, FeedbackService } from "./services/index";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [AlertComponent, ValidationMessagesComponent],
  providers: [
    AuthGuard,
    AlertService,
    ValidationService,
    AuthenticationService,
    UserService,
    IdeaService,
    CategoryService,
    TagService,
    FeedbackService,
    JwtInterceptorProvider,
    ErrorInterceptorProvider
  ],
  exports: [AlertComponent, ValidationMessagesComponent]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AlertService,
        ValidationService,
        AuthenticationService,
        UserService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
      ]
    };
  }
}
