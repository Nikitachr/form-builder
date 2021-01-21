import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-builder';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    //this.auth();
  }

  auth(): void {
    if (!localStorage.getItem('token')) {
      this.authService.login({ email: 'test@gmail.com', password: 'test' })
        .subscribe(
          ({ accessToken }) => localStorage.setItem('token', accessToken),
          // tslint:disable-next-line:max-line-length
          error =>  this.authService.register({ email: 'test@gmail.com', password: 'test' }).subscribe((res) => localStorage.setItem('token', res.accessToken))
        );
    }
  }
}

