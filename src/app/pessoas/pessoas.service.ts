import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoaUrl = 'http://localhost:9000/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro) {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, {headers, params})
    .toPromise()
    .then(response => {
      const pessoas = response['content'];
      const resultado = {
        pessoas: pessoas,
        total: response['totalElements']
      };
      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaUrl, { headers })
      .toPromise()
      .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoaUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);

  }

  mudarStatus(codigo: number, ativo: boolean) {
    let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }
}
