import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './app/pages/login/login.component';
import { GraphQLModule } from './app/graphql/graphql.module';  // Import your GraphQL module
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(),
  importProvidersFrom(GraphQLModule),  // Add GraphQL module here

  ],
});
