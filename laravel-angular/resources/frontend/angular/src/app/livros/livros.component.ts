import { Component, OnInit } from '@angular/core';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  livro: any;
  user: any;
  filtroTitulo: string = '';
  categoriaSelecionada: string = '';

  constructor(private route: ActivatedRoute, private anuncioService: AnuncioService, private livroService: LivroService, private router: Router, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filtroTitulo = params['filtroTitulo'] || ''; // Recupera o valor do parâmetro 'filtro' da URL
    });
    this.listarAnuncios();
  }

  listarAnuncios() {
    this.anuncioService.listarAnuncios().subscribe(
      (anuncios: any) => {
        this.anuncios = anuncios;
        this.livros = [];
        for (const anuncio of this.anuncios) {
          const idLivroAnuncio = anuncio.idLivro;
          const idUserAnunciante = anuncio.idDono;
          this.carregarLivroPorId(idLivroAnuncio, anuncio, idUserAnunciante);
        }
      },
      (error) => {
        console.error('Erro ao listar os anúncios cadastrados:', error);
      }
    );
  }

  carregarLivroPorId(idLivro: number, anuncio: any, idUser: number) {
    this.carregarUsuarioPorId(idUser).then((userAnuncio) => {
      this.livroService.livroPorId(idLivro).subscribe(
        (livro: any) => {
          this.livros.push({ anuncio, livro, userAnuncio });
        },
        (error) => {
          console.error('Erro ao buscar livro:', error);
        }
      );
    });
  }
  
  carregarUsuarioPorId(idUser: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usuarioService.usuarioPorId(idUser).subscribe(
        (user: any) => {
          resolve(user[0]);
        },
        (error) => {
          console.error('Erro ao buscar usuário:', error);
          reject(error);
        }
      );
    });
  }  

  verAnuncio(idAnuncio: number) {
    this.router.navigate(['/livro-anuncio', idAnuncio]);
  }

  filtrarLivros(event: Event) {
    const target = event.target as HTMLInputElement; // Cast 'event.target' to HTMLInputElement
    this.filtroTitulo = target.value.toLowerCase();
  }

  atendeCriteriosFiltro(livro: any): boolean {
    if (!this.filtroTitulo) {
      return true;
    }
    const tituloLivro = livro.livro?.titulo.toLowerCase();
    return tituloLivro.includes(this.filtroTitulo);
  }

  filtrarLivrosPorCategoria(categoriaSelecionada: string) {
    this.categoriaSelecionada = categoriaSelecionada;
  }

  atendeCriteriosCategoriaFiltro(livro: any): boolean {
    if(!this.categoriaSelecionada) {
      return true
    }
    const categoria = livro.livro?.categoria1;
    return categoria === this.categoriaSelecionada;
  }
  

}