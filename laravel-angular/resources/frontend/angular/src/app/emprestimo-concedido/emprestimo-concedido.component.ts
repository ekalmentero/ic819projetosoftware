import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emprestimo-concedido',
  templateUrl: './emprestimo-concedido.component.html',
  styleUrls: ['./emprestimo-concedido.component.css']
})
export class EmprestimoConcedidoComponent implements OnInit {

  anuncio: any;
  livro: any;
  user: any;
  token: any;
  userData: any;
  id: any;
  emprestimoData: any;

  constructor(private router: Router, private anuncioService: AnuncioService, private route: ActivatedRoute, private livroService: LivroService, private usuarioService: UsuariosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;

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
        const idUserRequerente = this.anuncio.idRequerente;
        console.log(anuncio)
        this.carregarLivroPorId(idLivroAnuncio);
        this.carregarUsuarioPorId(idUserRequerente);
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

  encerrarEmprestimo(idAnuncio: number) {

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const dados = {
      ativo: false,
      dataFim: currentDate 
    }

    this.anuncioService.encerrarEmprestimo(idAnuncio, dados).subscribe(
      (res: any) => {
        this.emprestimoData = res;
        if (this.emprestimoData.status === 1) {
          this.toastr.success(this.emprestimoData.message, this.emprestimoData.code, {
            timeOut: 2000,
            progressBar: true
          });
          this.irParaAvaliarEmprestimo(idAnuncio);
        } else {
          this.toastr.error(this.emprestimoData.message, this.emprestimoData.code, {
            timeOut: 2000,
            progressBar: true
          });
        }
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
      )
    }
    
    irParaAvaliarEmprestimo(idAnuncio: number) {
      this.router.navigate(['/avaliacao', idAnuncio]);
    }
    
}
