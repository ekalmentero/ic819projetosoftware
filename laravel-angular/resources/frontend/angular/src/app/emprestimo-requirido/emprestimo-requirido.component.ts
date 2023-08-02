import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emprestimo-requirido',
  templateUrl: './emprestimo-requirido.component.html',
  styleUrls: ['./emprestimo-requirido.component.css']
})
export class EmprestimoRequiridoComponent implements OnInit {

  anuncio: any;
  livro: any;
  user: any;
  updateForm!: FormGroup;
  submitted = false;
  dataInicio: any;
  dataFim: any;
  emprestimoData: any;
  idAnuncio: any;
  idUserAnunciante: any;
  idUserRequerente: any;
  userData: any;

  constructor(private formBuilder: FormBuilder, private anuncioService: AnuncioService, private route: ActivatedRoute, private livroService: LivroService, private usuarioService: UsuariosService, private router: Router, private toastr: ToastrService) {
    this.updateForm = this.formBuilder.group({
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]]
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
        this.anuncio = anuncio[0];
        const idLivroAnuncio = this.anuncio.idLivro;
        const idUserRequerente = this.anuncio.idRequerente;
        this.idAnuncio = this.anuncio.id;
        this.idUserAnunciante = this.anuncio.idDono;
        this.idUserRequerente = this.anuncio.idRequerente;
        const tempoEmprestimo= this.anuncio.tempoEmprestimo;
        this.carregarLivroPorId(idLivroAnuncio, tempoEmprestimo);
        this.carregarUsuarioPorId(idUserRequerente);
      }
    )
  }

  carregarLivroPorId(idLivro: number, tempoEmprestimo: string) {
    this.livroService.livroPorId(idLivro).subscribe(
      (livro: any) => {
        this.livro = livro;
        livro.tempoEmprestimo = tempoEmprestimo;
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

    const idAnuncio = this.idAnuncio;

    const dados = {
      emprestado: true,
      dataInicioPrazo: this.dataInicio,
      dataFimPrazo: this.dataFim
    }

    this.anuncioService.concederEmprestimo(idAnuncio, dados).subscribe(
      (res: any) => {
        this.emprestimoData = res;
        if (this.emprestimoData.status === 1) {
          this.toastr.success(this.emprestimoData.message, this.emprestimoData.code, {
            timeOut: 2000,
            progressBar: true
          });
          this.router.navigate(['/emprestimo-concedido', idAnuncio]);
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

    const idUserAnunciante = this.idUserAnunciante;
    this.carregarUsuarioPorId(idUserAnunciante);

    const numEmprestimosConcedidos = this.user.emprestimosConcedidos + 1;

    const dadosUserDono = {
      emprestimosConcedidos: numEmprestimosConcedidos
    }

    this.usuarioService.emprestimosConcedidos(idUserAnunciante, dadosUserDono).subscribe(
      (res: any) => {
        this.userData = res;
      },
      (error) => {
        console.error('Erro na requisição:', error);
        this.submitted = false;
      }
    )

    const idUserRequerente = this.idUserRequerente;
    this.carregarUsuarioPorId(idUserRequerente);

    const numEmprestimosRequeridos = this.user.emprestimosRequeridos + 1;

    const dadosUserRequerente = {
      emprestimosRequeridos: numEmprestimosRequeridos
    }

    this.usuarioService.emprestimosRequeridos(idUserRequerente, dadosUserRequerente).subscribe(
      (res: any) => {
        this.userData = res;
      },
      (error) => {
        console.error('Erro na requisição:', error);
        this.submitted = false;
      }
    )

  }

}
