import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  userData: any;
  token: any;
  isAuthenticated: boolean = false;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private toastr: ToastrService, private router: Router) { }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  submit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.usuariosService.login(this.loginForm.value).subscribe(res => {
      this.userData = res;
      if(this.userData.status === 1) {
        this.token = this.userData.data.token;
        localStorage.setItem('token', this.token);
        this.isAuthenticated = true;
        this.router.navigate(['/']);
        this.toastr.success(JSON.stringify(this.userData.message), JSON.stringify(this.userData.code), {
          timeOut: 2000,
          progressBar: true
        });
      } else if(this.userData.status === 0) {
        this.toastr.error(JSON.stringify(this.userData.message), JSON.stringify(this.userData.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    })
  }

}
