import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  getAuthenticateUrl() {
    return this._http.get(environment.apiUrl + '/url');
  }

  getAuthorized(code) {
    return this._http.get(`${environment.apiUrl}/auth/google-auth?code=${code}`);
  }
}
