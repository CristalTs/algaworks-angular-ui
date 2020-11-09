import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:9000/ouath/token';

  constructor(
    private http: HttpClient
  ) { }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
    .toPromise().then(response => {
      console.log(response);
    })
    .catch(response => {
      console.log(response);
    });

  }
}