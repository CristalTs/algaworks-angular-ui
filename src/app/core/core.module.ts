import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    MessageService,
    ConfirmationService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
