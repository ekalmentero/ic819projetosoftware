import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LivroService } from '../services/livro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-livro',
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.css']
})
export class CadastroLivroComponent implements OnInit {

  registerForm!: FormGroup;
  livroData: any;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private livroService: LivroService, private toastr: ToastrService) { }
  
  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      cover: [''],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      idioma: ['', Validators.required],
      sinopse: [''],
      editora: [''],
      edicao: [''],
      ano: ['', Validators.minLength(0)],
      numPag: [null, [Validators.required, Validators.min(1)]],
      categoria1: ['Selecione...', Validators.required],
      categoria2: ['Selecione...'],
      categoria3: ['Selecione...'],
      sbn10: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sbn13: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]]
    });
  }
  
  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  get f() { return this.registerForm.controls; }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.livroService.registrarLivro(this.registerForm.value).subscribe(res => {
      this.livroData = res;

      if(this.livroData.status === 1) {
        this.toastr.success(JSON.stringify(this.livroData.message), JSON.stringify(this.livroData.code), {
          timeOut: 2000,
          progressBar: true
        })
        this.router.navigate(['/cadastro-anuncio']);
      } else {
        this.toastr.error(JSON.stringify(this.livroData.message), JSON.stringify(this.livroData.code), {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.registerForm.get('cover')?.reset();
      this.registerForm.get('titulo')?.reset();
      this.registerForm.get('autor')?.reset();
      this.registerForm.get('idioma')?.reset();
      this.registerForm.get('sinopse')?.reset();
      this.registerForm.get('editora')?.reset();
      this.registerForm.get('edicao')?.reset();
      this.registerForm.get('ano')?.reset();
      this.registerForm.get('numPag')?.reset();
      this.registerForm.get('categoria1')?.setValue('Selecione...');
      this.registerForm.get('categoria2')?.setValue('Selecione...');
      this.registerForm.get('categoria3')?.setValue('Selecione...');
      this.registerForm.get('sbn10')?.reset();
      this.registerForm.get('sbn13')?.reset();
    })
  }

}
