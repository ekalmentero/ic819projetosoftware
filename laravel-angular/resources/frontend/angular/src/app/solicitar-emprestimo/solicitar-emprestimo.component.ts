import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitar-emprestimo',
  templateUrl: './solicitar-emprestimo.component.html',
  styleUrls: ['./solicitar-emprestimo.component.css']
})
export class SolicitarEmprestimoComponent implements OnInit {

  anuncio: any;
  livro: any;
  user: any;
  updateForm!: FormGroup;
  submitted = false;
  token: any;
  userData: any;
  id: any;
  tempoEmprestimo: any;
  emprestimoData: any;
  idAnuncio: any;

  constructor(private router: Router, private route: ActivatedRoute, private anuncioService: AnuncioService, private livroService: LivroService, private usuarioService: UsuariosService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.updateForm = this.formBuilder.group({
      tempoEmprestimo: ['', [Validators.required]]
    });
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
        this.anuncio = anuncio;
        const anuncioSelecionado = anuncio[0];
        const idLivroAnuncio = anuncioSelecionado.idLivro;
        const idUserAnunciante = anuncioSelecionado.idDono;
        this.idAnuncio = anuncioSelecionado.id;
        this.carregarLivroPorId(idLivroAnuncio);
        this.carregarUsuarioPorId(idUserAnunciante);
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

  get f() { return this.updateForm.controls; }

  submit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;
    const idAnuncio = this.idAnuncio;

    const dados = {
      idRequerente: this.id,
      tempoEmprestimo: this.tempoEmprestimo
    }
    
    this.anuncioService.solicitarEmprestimo(idAnuncio, dados).subscribe(
      (res: any) => {
        this.emprestimoData = res;
        if (this.emprestimoData.status === 1) {
          this.toastr.success(this.emprestimoData.message, this.emprestimoData.code, {
            timeOut: 2000,
            progressBar: true
          });
          this.router.navigate(['/']);
        } else {
          this.toastr.error(this.emprestimoData.message, this.emprestimoData.code, {
            timeOut: 2000,
            progressBar: true
          });
        }
        this.submitted = false;
      },
      (error) => {
        console.error('Erro na requisição:', error);
        this.submitted = false;
      }
    );

  }

}
