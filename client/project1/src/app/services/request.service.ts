import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  // Get Youtube Live Stream Details By ID
  getYoutubeDetails(body) {
    return this._http.post(`${environment.apiUrl}/v1/broadcast`, body);
  }

  searchByKeyword(keyword, userId) {
    return this._http.get(`${environment.apiUrl}/v1/search/${userId}/${keyword}`)  
  }
}
