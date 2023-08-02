import { Component, OnInit } from '@angular/core';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  livro: any;
  filtroTitulo: string = '';

  constructor(private router: Router, private anuncioService: AnuncioService, private livroService: LivroService) { }

  ngOnInit(): void {
    this.listarAnunciosRecentes();
  }

  listarAnunciosRecentes() {
    this.anuncioService.listarAnunciosRecentes().subscribe(
      (anuncios: any) => {
        this.anuncios = anuncios;
        this.livros = []; // Criar uma matriz para armazenar os livros de cada anúncio
        for (const anuncio of this.anuncios) {
          const idLivroAnuncio = anuncio.idLivro;
          const anuncioAtivo = anuncio.ativo;
          this.carregarLivroPorId(idLivroAnuncio, anuncioAtivo);
        }
      },
      (error) => {
        console.error('Erro ao listar os anúncios cadastrados:', error);
      }
    );
  }

  carregarLivroPorId(idLivro: number, anuncioAtivo: boolean) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        livro.status = anuncioAtivo;
        this.livros.push(livro); // Adicionar o livro à matriz de livros
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  buscarLivros() {
    if (this.filtroTitulo.trim() !== '') {
      this.router.navigate(['/livros'], { queryParams: { filtroTitulo: this.filtroTitulo } });
    } else {
      // Caso o usuário não tenha digitado nada, redirecionar para a página de livros sem filtro
      this.router.navigate(['/livros']);
    }
  }

}

