import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  // Set Token
  setToken(token) {
    sessionStorage.setItem('_token', token);
  }

  // Get Token
  getToken() {
    return JSON.parse(sessionStorage.getItem('_token'));
  }

  // Set User Info
  setUserDetails(info) {
    sessionStorage.setItem('_currentUser', info);
  }

  // Get User Info
  getUserInfo() {
    return JSON.parse(sessionStorage.getItem('_currentUser'));
  }
}
