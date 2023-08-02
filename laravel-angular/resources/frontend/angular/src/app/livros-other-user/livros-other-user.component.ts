import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-livros-other-user',
  templateUrl: './livros-other-user.component.html',
  styleUrls: ['./livros-other-user.component.css']
})
export class LivrosOtherUserComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  user: any;
  livrosDono: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuariosService, private anuncioService: AnuncioService, private livroService: LivroService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idUser = params.get('idUser');
      this.carregarLivroPorIdDono(idUser);
      this.carregarUsuarioPorId(idUser);
    });
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

  verLivro(idLivro: number, idUser: number) {
    this.router.navigate(['/livro', idLivro, idUser]);
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

}
