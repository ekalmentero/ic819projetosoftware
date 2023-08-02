import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {

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
  idDono: any;
  idLivro: any;
  isValid: boolean = false;

  constructor(private route: ActivatedRoute, private livroService: LivroService, private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idLivro = params.get('idLivro');
      const idUser = params.get('idUser');
      this.carregarLivroPorId(idLivro);
      this.carregarUsuarioPorId(idUser);
    });
  }

  carregarLivroPorId(idLivro: any) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        this.livro = livro;
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  carregarUsuarioPorId(idUser: any) {
    this.usuarioService.usuarioPorId(idUser).subscribe(
      (user: any) => {
        this.user = user[0];
      },
      (error) => {
        console.error('Erro ao buscar usuário:', error);
      }
    )
  }


}
