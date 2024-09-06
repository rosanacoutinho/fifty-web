import { Component, OnInit } from '@angular/core';
import { CorretorService } from '../corretor/corretor.service';
import { Corretor } from '../models/corretor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parceiros',
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.css']
})
export class ParceirosComponent implements OnInit {

  constructor(
  private corretorService: CorretorService,
  private router: Router) { }

  corretores: Corretor[] = []
  
  ngOnInit(): void {
    this.buscaCorretores();
  }

  buscaCorretores():void{
    this.corretorService.getCorretores().subscribe({
      next: (response) => {
        this.corretores = response;
        console.log(response)
      },
      error: (err) => {
        console.error('Erro ao obter dados:', err);
      }
  });
}

voltar(){
  this.router.navigate(['/parceiros'])
}
}
