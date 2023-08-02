import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css']
})
export class CadastroUserComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  userData: any;
  selectedProfilePicture: File | null = null;

  constructor(private router: Router, private formBuilder: FormBuilder, private usuariosService: UsuariosService, private toastr: ToastrService) { }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', [Validators.required]],
      idade: [null, [Validators.required]],
      sexo: ['Selecione...', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['Selecione...', [Validators.required]],
      bio: [''],
      emprestimosConcedidos: [0],
      emprestimosRequeridos: [0],
      nota: [0],
      fotoPerfil: [null],
      admin: [0, [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'passwordConfirm')
    });
  }

  //Função para confirmar senha
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null)
      }
    };
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files?.length) {
      this.selectedProfilePicture = inputElement.files[0];
    } else {
      this.selectedProfilePicture = null;
    }
  }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  get f() { return this.registerForm.controls; }

  submit() {
    console.log(this.registerForm);
    this.submitted = true;
    for (const field in this.registerForm.controls) {
      if (this.registerForm.controls[field].invalid) {
        console.log(`Validation error for field ${field}:`, this.registerForm.controls[field].errors);
      }
    }

    const formData: FormData = new FormData();
    formData.append('nome', this.registerForm.value.nome);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('telefone', this.registerForm.value.telefone);
    formData.append('idade', this.registerForm.value.idade);
    formData.append('sexo', this.registerForm.value.sexo);
    formData.append('cidade', this.registerForm.value.cidade);
    formData.append('estado', this.registerForm.value.estado);
    formData.append('bio', this.registerForm.value.bio);
    formData.append('emprestimosConcedidos', this.registerForm.value.emprestimosConcedidos);
    formData.append('emprestimosRequeridos', this.registerForm.value.emprestimosRequeridos);
    formData.append('nota', this.registerForm.value.nota);
    formData.append('admin', this.registerForm.value.admin);
    formData.append('passwordConfirm', this.registerForm.value.passwordConfirm);

    if (this.selectedProfilePicture) {
      formData.append('fotoPerfil', this.selectedProfilePicture, this.selectedProfilePicture.name);
    }

    this.usuariosService.registerUser(formData).subscribe(res => {
      this.userData = res;

      if (this.userData.status === 1) {
        this.toastr.success(JSON.stringify(this.userData.message), JSON.stringify(this.userData.code), {
          timeOut: 2000,
          progressBar: true
        })
        this.router.navigate(['/login-user']);
      } else {
        this.toastr.error(JSON.stringify(this.userData.message), JSON.stringify(this.userData.code), {
          timeOut: 2000,
          progressBar: true
        })
      }
      this.submitted = false;
      this.registerForm.get('nome')?.reset();
      this.registerForm.get('email')?.reset();
      this.registerForm.get('password')?.reset();
      this.registerForm.get('telefone')?.reset();
      this.registerForm.get('idade')?.reset();
      this.registerForm.get('sexo')?.setValue('Selecione...');
      this.registerForm.get('cidade')?.reset();
      this.registerForm.get('estado')?.setValue('Selecione...');
      this.registerForm.get('bio')?.reset();
      this.registerForm.get('passwordConfirm')?.reset();
    })
  }


}
