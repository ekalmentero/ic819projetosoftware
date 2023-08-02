import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-emprestimos-user',
  templateUrl: './emprestimos-user.component.html',
  styleUrls: ['./emprestimos-user.component.css']
})
export class EmprestimosUserComponent implements OnInit {

  livrosOutraArray: any[] = [];
  livrosEmprestados: any[] = [];
  token: any;
  userData: any;
  id: any;

  constructor(private router: Router, private route: ActivatedRoute, private anuncioService: AnuncioService, private livroService: LivroService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;

    this.route.paramMap.subscribe(params => {
      const idUser = params.get('idUser');
      this.carregarMeusEmprestimos(idUser);
    });
  }

  async carregarMeusEmprestimos(idUser: any) {
    try {
      const livrosEmprestados: any = await this.anuncioService.listarMeusEmprestimos(idUser).toPromise();
      this.livrosEmprestados = livrosEmprestados;
      this.livrosOutraArray = []; // Criar uma matriz diferente para armazenar os livros de cada anúncio emprestado
    
      for (const livroEmprestado of this.livrosEmprestados) {
        const idLivroEmprestado = livroEmprestado.idLivro;
        const idDonoLivro = livroEmprestado.idDono;
        const idRequerenteLivro = livroEmprestado.idRequerente;
        const statusEmprestimo = livroEmprestado.ativo;
        const idAnuncioEmprestimo = livroEmprestado.id;
        const avaliado = livroEmprestado.avaliacao;
        console.log(livroEmprestado)
        await this.carregarLivroPorIdOutraArray(idLivroEmprestado, idDonoLivro, idRequerenteLivro, statusEmprestimo, idAnuncioEmprestimo, avaliado); 
      }
    } catch (error) {
      console.error('Erro: ', error);
    }
  }  

  carregarLivroPorIdOutraArray(idLivro: number, idDonoLivro: number, idRequerenteLivro: number, statusEmprestimo: boolean, idAnuncioEmprestimo: number, avaliado: any) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        livro.idDono = idDonoLivro;
        livro.idRequerente = idRequerenteLivro;
        livro.status = statusEmprestimo;
        livro.idAnuncio = idAnuncioEmprestimo;
        livro.avaliacao = avaliado;
        this.livrosOutraArray.push(livro); // Adicionar o livro à matriz de livros
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  verEmprestimo(idAnuncio: number) {
    this.router.navigate(['/emprestimo-concedido', idAnuncio]);
  }
  
}
