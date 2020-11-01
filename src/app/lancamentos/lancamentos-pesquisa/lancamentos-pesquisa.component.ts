import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import {LazyLoadEvent} from 'primeng/components/common/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalResgistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private service: LancamentoService,
    private messageService: MessageService ) {}

  ngOnInit(): void {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.service.pesquisar(this.filtro)
    .then(result => {
      this.totalResgistros = result.total;
      this.lancamentos = result.lancamentos;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.service.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.reset();
      }

      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' });
    });
  }
}
