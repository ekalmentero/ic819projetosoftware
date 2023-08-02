import { Component, OnInit } from '@angular/core';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anuncios-user',
  templateUrl: './anuncios-user.component.html',
  styleUrls: ['./anuncios-user.component.css']
})
export class AnunciosUserComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  token: any;
  userData: any;
  id: any;
  idRequerente: any;
  isRequerido: boolean = false;
  livrosDono: any[] = [];

  constructor(private anuncioService: AnuncioService, private livroService: LivroService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;
    this.listarAnunciosUser(this.id);
  }

  listarAnunciosUser(idDono: number) {
    this.anuncioService.listarAnunciosDono(idDono).subscribe(
      (anuncios: any) => {
        this.anuncios = anuncios;
        this.livros = []; 
        for (const anuncio of this.anuncios) {
          const idLivroAnuncio = anuncio.idLivro;
          this.carregarLivroPorId(idLivroAnuncio, anuncio);
        }
      },
      (error) => {
        console.error('Erro ao listar os anúncios cadastrados:', error);
      }
    );
  }

  carregarLivroPorId(idLivro: number, anuncio: any) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        const livroItem = { anuncio, livro, isRequerido: false, isConcedido: false }; // Initialize isRequerido as false
        this.livros.push(livroItem);
  
        if (anuncio.idRequerente != null && anuncio.emprestado === 0) {
          livroItem.isRequerido = true; 
        } else if (anuncio.idRequerente != null && anuncio.emprestado === 1) {
          livroItem.isConcedido = true;
        }
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }
  
  verAnuncio(idAnuncio: number) {
    this.router.navigate(['/livro-anuncio', idAnuncio]);
  }

  verRequerimento(idAnuncio: number) {
    this.router.navigate(['/emprestimo-requerido', idAnuncio]);
  }

  verEmprestimo(idAnuncio: number) {
    this.router.navigate(['/emprestimo-concedido', idAnuncio]);
  }


}
