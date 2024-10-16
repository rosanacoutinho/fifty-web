import { Component } from '@angular/core';
import { SolicitacaoSenha } from '../models/solicitacaoSenha';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private adminService: AdminService
  ) { }

  solicitacoesSenha: SolicitacaoSenha[] = []

  ngOnInit(): void {
    this.consultarSolicitacoes();
  }

  resolveSolicitacao(id: string){
    this.adminService.resolveSolicitacao(id).subscribe({
      next: (response) => {
        alert(response)
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  gerarSenhaProvisoria(creci: string){
    this.adminService.geraSenhaProvisoria(creci).subscribe({
      next: (response) => {
        this.consultarSolicitacoes();
        alert(response)
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  consultarSolicitacoes(){
    this.adminService.getSolicitacoesSenha().subscribe({
      next: (response) => {
        this.solicitacoesSenha = response;
      },
      error: (err: any) => {
        console.error('Erro ao obter dados:', err);
      }
    });
  }
}
