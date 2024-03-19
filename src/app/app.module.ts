import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HasRolesDirective } from './directives/has-roles.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ProductsComponent,
    NotFoundComponent,
    HasRolesDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
