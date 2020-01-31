import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  url: string;
  constructor(
    private _auth: AuthService,
    private activated: ActivatedRoute,
    private utility: UtilitiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activated.queryParamMap.subscribe((query) => {
      // console.log('Code:', query.get('code'));
      if (query.has('code')) {
        this._auth.getAuthorized(query.get('code')).subscribe((authenticate: any) => {
          console.log('Auth: ', authenticate);
          const id = authenticate.id.split('/')[1];
          const info = {
            userId: id,
            name: authenticate.name,
            email: authenticate.email
          };
          this.utility.setUserDetails(JSON.stringify(info)); 
          const token = {
            access_token: authenticate.token.access_token,
            Expiration: authenticate.token.expiry_date
          }
          this.utility.setToken(JSON.stringify(token));    
          this.router.navigate(['live']);
        });
      } else {
        console.log('UnAuthorized User Access');
      }
    });
    this._auth.getAuthenticateUrl().subscribe((url: any) => {
      console.log('URL: ', url);
      this.url = url;
    });
  }

  login() {
  }
}
