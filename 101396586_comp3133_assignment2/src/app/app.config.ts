
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GraphQLModule } from './graphql/graphql.module';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    importProvidersFrom(GraphQLModule, CommonModule, ReactiveFormsModule),  // Add both modules here
  ],
};

