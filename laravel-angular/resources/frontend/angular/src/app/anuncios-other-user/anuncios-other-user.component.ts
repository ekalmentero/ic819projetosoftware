import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-anuncios-other-user',
  templateUrl: './anuncios-other-user.component.html',
  styleUrls: ['./anuncios-other-user.component.css']
})
export class AnunciosOtherUserComponent implements OnInit {

  anuncios: any[] = [];
  livros: any[] = [];
  user: any;

  constructor(private router: Router, private route: ActivatedRoute, private usuarioService: UsuariosService, private anuncioService: AnuncioService, private livroService: LivroService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idUser = params.get('idUser');
      this.listarAnunciosUser(idUser);
      this.carregarUsuarioPorId(idUser);
    });
  }

  listarAnunciosUser(idUser: any) {
    this.anuncioService.listarAnunciosDono(idUser).subscribe(
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
        const livroItem = { anuncio, livro, isRequerido: false }; // Initialize isRequerido as false
        this.livros.push(livroItem);
  
        if (anuncio.idRequerente != null) {
          livroItem.isRequerido = true; // Set isRequerido to true if idRequerente is not null
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
