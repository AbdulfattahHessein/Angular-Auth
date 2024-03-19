import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { reloadAfterNavigation } from 'src/app/helpers/reload-after-navigation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  username: string = '';
  password: string = '';

  authService = inject(AuthService);
  router = inject(Router);
  httpClient = inject(HttpClient);
  ngOnInit(): void {
    this.isLoggedInSubscription();
  }
  isLoggedInSubscription() {
    const sub = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.navigateToRedirectUrl();
      }
    });
    this.subscriptions.push(sub);
  }

  login() {
    // this.httpClient.get('https://reqres.in/api/login').subscribe((data) => {
    //   console.log(data);
    // });

    this.authService
      .login(this.username, this.password)
      .subscribe((response) => {
        if (response.success) {
          this.navigateToRedirectUrl();
          console.log(response);
        } else {
          alert(response.message);
          console.log(response);
        }
      });
  }
  navigateToRedirectUrl() {
    const returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] ?? 'Home';

    this.router.navigate([returnUrl]).then(reloadAfterNavigation);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
