import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:9000/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}?resumo`)
    .toPromise()
    .then(response => {
      console.log(response);
    });
  }
}
