import * as moment from 'moment';

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();

}

export class Categoria {
  codigo: number;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

  static toJson(lancamento: Lancamento): any {
    return {
      ...lancamento,
      dataVencimento: moment(lancamento.dataVencimento).format('YYYY-MM-DD'),
      dataPagamento: moment(lancamento.dataPagamento).format('YYYY-MM-DD')
    };
  }
}