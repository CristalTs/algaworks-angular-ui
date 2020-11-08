import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Pessoa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PessoasService } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private errorHandler: ErrorHandlerService,
    private service: PessoasService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoas(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.service.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
      this.router.navigate(['/pessoas'] );
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoas(form: FormControl) {
    this.service.atualizar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.service.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

}
