import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-perfil-other-user',
  templateUrl: './perfil-other-user.component.html',
  styleUrls: ['./perfil-other-user.component.css']
})
export class PerfilOtherUserComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  idUser: any;
  user: any;
  livrosDono: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuariosService, private anuncioService: AnuncioService, private livroService: LivroService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idUser = params.get('idUser');
      this.listarAnunciosUser(idUser);
      this.carregarUsuarioPorId(idUser);
      this.carregarLivroPorIdDono(idUser);
    });
  }

  listarAnunciosUser(idUser: any) {
    this.anuncioService.listarAnunciosDono(idUser).subscribe(
      (anuncios: any) => {
        this.anuncios = anuncios;
        this.livros = []; // Criar uma matriz para armazenar os livros de cada anúncio
        for (const anuncio of this.anuncios) {
          const idLivroAnuncio = anuncio.idLivro;
          this.carregarLivroPorId(idLivroAnuncio);
        }
      },
      (error) => {
        console.error('Erro ao listar os anúncios cadastrados:', error);
      }
    )
  }

  carregarLivroPorId(idLivro: number) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        this.livros.push(livro); // Adicionar o livro à matriz de livros
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  carregarUsuarioPorId(idUser: any) {
    this.usuarioService.usuarioPorId(idUser).subscribe(
      (user: any) => {
        for(var i = 0; i < user.length; i++) {
          this.user = user[i];
        }
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    )
  }

  carregarLivroPorIdDono(idDono: any) {
    this.livroService.livroPorIdDono(idDono).subscribe(
      (livrosDono: any) => {
        this.livrosDono = livrosDono;
      },
      (error) => {
        console.error('Erro: ', error);
      }
    )
  }

  verLivrosUser(idUser: any) {
    this.router.navigate(['/livros-other-user', idUser]);
  }

  verAnunciosUser(idUser: any) {
    this.router.navigate(['/anuncios-other-user', idUser]);
  }

}