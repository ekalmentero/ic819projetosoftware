import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  token: any;
  userData: any;
  email: any;
  nome: any;
  cidade: any;
  estado: any;
  bio: any;
  telefone: any;
  id: any;
  nota: any;
  emprestimosConcedidos: any;
  emprestimosRequeridos: any
  fotoPerfil: any;
  anuncios: any[] = [];
  livros: any[] = [];
  livrosOutraArray: any[] = [];
  livrosDono: any[] = [];
  livrosEmprestados: any[] =[];
  fotoPerfilUrl: string | undefined;

  constructor(private router: Router, private anuncioService: AnuncioService, private livroService: LivroService, private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    this.nome = this.userData.nome;
    this.cidade = this.userData.cidade;
    this.estado = this.userData.estado;
    this.bio = this.userData.bio;
    this.telefone = this.userData.telefone;
    this.id = this.userData.user_id;
    this.nota = this.userData.nota;
    this.emprestimosConcedidos = this.userData.emprestimosConcedidos;
    this.emprestimosRequeridos = this.userData.emprestimosRequeridos;
    this.fotoPerfil = this.userData.fotoPerfil;

    this.listarAnunciosUser(this.id);
    this.carregarLivroPorIdDono(this.id);
    this.carregarMeusEmprestimos(this.id);

    this.usuarioService.getFotoPerfil(this.fotoPerfil).subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.fotoPerfilUrl = reader.result as string;
        };
        reader.readAsDataURL(imageBlob);
      },
      (error) => {
        console.log('Erro ao obter a imagem de perfil:', error);
      }
    );
  }

  listarAnunciosUser(idDono: number) {
    this.anuncioService.listarAnunciosDono(idDono).subscribe(
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
    )
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

  carregarLivroPorIdOutraArray(idLivro: number) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        this.livrosOutraArray.push(livro); // Adicionar o livro à matriz de livros
      },
      (error) => {
        console.error('Erro ao buscar livro:', error);
      }
    );
  }

  carregarLivroPorIdDono(idDono: number) {
    this.livroService.livroPorIdDono(idDono).subscribe(
      (livrosDono: any) => {
        this.livrosDono = livrosDono;
      },
      (error) => {
        console.error('Erro: ', error);
      }
    )
  }

  carregarMeusEmprestimos(idUser: number) {
    this.anuncioService.listarMeusEmprestimos(idUser).subscribe(
      (livrosEmprestados: any) => {
        this.livrosEmprestados = livrosEmprestados;
        this.livrosOutraArray = []; // Criar uma matriz diferente para armazenar os livros de cada anúncio emprestado
        for (const livroEmprestado of this.livrosEmprestados) {
          const idLivroEmprestado = livroEmprestado.idLivro;
          this.carregarLivroPorIdOutraArray(idLivroEmprestado);
        }
      },
      (error) => {
        console.error('Erro: ', error);
      }
    );
  }

  verMeusEmprestimos(idUser: number) {
    this.router.navigate(['/emprestimos-user', idUser]);
  }


}
