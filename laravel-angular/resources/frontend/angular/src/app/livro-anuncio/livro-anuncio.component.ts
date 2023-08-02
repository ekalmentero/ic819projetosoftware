import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-livro-anuncio',
  templateUrl: './livro-anuncio.component.html',
  styleUrls: ['./livro-anuncio.component.css']
})
export class LivroAnuncioComponent implements OnInit {

  token: any;
  userData: any;
  email: any;
  nome: any;
  cidade: any;
  estado: any;
  bio: any;
  telefone: any;
  id: any;
  anuncio: any;
  livro: any;
  user: any;
  isAuthenticated: boolean;
  idDono: any;
  isValid: boolean = false;

  constructor(private anuncioService: AnuncioService, private route: ActivatedRoute, private livroService: LivroService, private usuarioService: UsuariosService, private router: Router) {
    this.isAuthenticated = this.usuarioService.isAuthenticatedFunction();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idAnuncio = params.get('idAnuncio');
      this.carregarAnuncioPorId(idAnuncio);
    });
  }

  carregarAnuncioPorId(idAnuncio: any) {
    this.anuncioService.anuncioPorId(idAnuncio).subscribe(
      (anuncio: any) => {
        this.anuncio = anuncio[0];
        const idLivroAnuncio = this.anuncio.idLivro;
        const idUserAnunciante = this.anuncio.idDono;
        this.idDono = this.anuncio.idDono;
        this.carregarLivroPorId(idLivroAnuncio);
        this.carregarUsuarioPorId(idUserAnunciante);
        this.validator(this.idDono);
      }
    )
  }

  carregarLivroPorId(idLivro: number) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        this.livro = livro;
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  carregarUsuarioPorId(idUser: number) {
    this.usuarioService.usuarioPorId(idUser).subscribe(
      (user: any) => {
        this.user = user[0];
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    )
  }

  solicitarEmprestimo(idAnuncio: number) {
    this.router.navigate(['/solicitar-emprestimo', idAnuncio]);
  }

  validator(idDono: any) {
    this.usuarioService.isAuthenticatedFunction()
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;
    if(this.isAuthenticated) {
      if(this.idDono != this.id) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
  }

  seeUserProfile(idUser: any) {
    this.router.navigate(['/perfil-other-user', idUser]);
  }

}
