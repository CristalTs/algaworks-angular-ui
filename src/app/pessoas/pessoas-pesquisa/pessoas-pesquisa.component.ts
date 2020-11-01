import { PessoaFiltro, PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

import {LazyLoadEvent} from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalResgistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private service: PessoasService) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro)
    .then(result => {
      this.totalResgistros = result.total;
      this.pessoas = result.pessoas;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
