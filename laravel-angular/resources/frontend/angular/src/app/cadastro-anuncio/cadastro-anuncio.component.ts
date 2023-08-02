import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnuncioService } from '../services/anuncio.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-anuncio',
  templateUrl: './cadastro-anuncio.component.html',
  styleUrls: ['./cadastro-anuncio.component.css']
})
export class CadastroAnuncioComponent implements OnInit {

  registerForm!: FormGroup;
  livros: any[] = [];
  anuncioData: any;
  userData: any;
  submitted = false;
  livroSelecionado: any;
  token: any;
  id: any;

  constructor(private router: Router, private livroService: LivroService, private formBuilder: FormBuilder, private anuncioService: AnuncioService, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      livroSelected: ['Selecione...', [Validators.required]]
    });
  }

  ngOnInit() {
    this.listarLivrosCadastrados();
  }

  listarLivrosCadastrados() {
    this.livroService.listarLivros().subscribe(
      (livros: any) => {
        this.livros = livros
      },
      (error) => {
        console.error('Erro ao listar os livros cadastrados:', error);
      }
    );
  }

  get f() { return this.registerForm.controls; }

  
  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.id = this.userData.user_id;

    const dados = {
      idDono: this.id,
      idRequerente: null,
      idLivro: this.livroSelecionado,
      ativo: true,
      emprestado: false,
      dataInicioPrazo: null,
      dataFimPrazo: null,
      dataFim: null,
      avaliacao: null,
      relato: null
    }

    this.anuncioService.registrarAnuncio(dados).subscribe(res => {
        this.anuncioData = res;
        if(this.anuncioData.status === 1) {
          this.toastr.success(JSON.stringify(this.anuncioData.message), JSON.stringify(this.anuncioData.code), {
            timeOut: 2000,
            progressBar: true
          })
          this.router.navigate(['/perfil-user']);
        } else {
          this.toastr.error(JSON.stringify(this.anuncioData.message), JSON.stringify(this.anuncioData.code), {
            timeOut: 2000,
            progressBar: true
          })
        }
        this.submitted = false;
      })
  }
}
