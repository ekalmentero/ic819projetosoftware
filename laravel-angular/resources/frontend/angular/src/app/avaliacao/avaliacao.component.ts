import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnuncioService } from '../services/anuncio.service';
import { LivroService } from '../services/livro.service';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  anuncio: any;
  livro: any;
  user: any;
  updateForm!: FormGroup;
  submitted = false;
  relato: any;
  avaliacao: any;
  idAnuncio: any;
  emprestimoData: any;
  idRequerente: any;
  userData: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private anuncioService: AnuncioService, private route: ActivatedRoute, private livroService: LivroService, private usuarioService: UsuariosService, private toastr: ToastrService) { 
    this.updateForm = this.formBuilder.group({
      avaliacao: [''],
      relato: ['']
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
        this.idRequerente = this.anuncio.idRequerente;
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

  submit() {
    this.submitted = true;
    const avaliacaoValue = this.updateForm.get('avaliacao')?.value;

    const dados = {
      avaliacao: avaliacaoValue,
      relato: this.relato
    }

    const idAnuncio = this.idAnuncio;

    this.anuncioService.avaliarEmprestimo(idAnuncio, dados).subscribe(
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

    const idRequerente = this.idRequerente;
    this.carregarUsuarioPorId(idRequerente);

    const notaDoUsuario = this.user.nota;
    const emprestimosRequeridos = this.user.emprestimosRequeridos;
    const newNota = (parseFloat(avaliacaoValue) + (parseFloat(notaDoUsuario) * (parseFloat(emprestimosRequeridos) - 1))) / parseFloat(emprestimosRequeridos);

    const dadosUsuarioRequerente = {
      nota: newNota
    }

    this.usuarioService.notaUser(idRequerente, dadosUsuarioRequerente).subscribe(
      (res: any) => {
        this.userData = res;
        console.log(notaDoUsuario)
        console.log(avaliacaoValue)
        console.log(idRequerente)
      }
    )

  }

}
