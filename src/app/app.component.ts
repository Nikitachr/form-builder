import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {catchError, first} from 'rxjs/operators';

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
    if (!localStorage.getItem('token')) {
      this.authService.login({ email: 'test@gmail.com', password: 'test' })
        .subscribe(
          res => localStorage.setItem('token', res.accessToken),
          // tslint:disable-next-line:max-line-length
          error =>  this.authService.register({ email: 'test@gmail.com', password: 'test' }).subscribe(res => localStorage.setItem('token', res.accessToken))
        );
    }
  }
}

