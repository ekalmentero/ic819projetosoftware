import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';

  isAuthenticated: boolean;
  token: any;
  userData: any;
  email: any;
  nome: any;

  constructor(private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef, private renderer: Renderer2) {
    this.isAuthenticated = this.usuariosService.isAuthenticatedFunction();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    this.email = this.userData.email;
    this.nome = this.userData.nome;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login-user']);
    this.isAuthenticated = false;
  }

  scrollToSobre() {
    const sobreSection = this.elementRef.nativeElement.querySelector('#sobre');
    if (sobreSection) {
      sobreSection.scrollIntoView({ behavior: 'smooth' });
    }
  }  

}
