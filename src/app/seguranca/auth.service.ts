import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:9000/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
    .toPromise().then(response => {
      this.armazenarToken(response['access_token']);
    })
    .catch(response => {
      if (response['status'] === 400) {
        console.log(response['error'].error);
        if (response['error'].error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválido');
        }
      }

      return Promise.reject(response);
    });

  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
