import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { CadastroLivroComponent } from './cadastro-livro/cadastro-livro.component';
import { LivroAnuncioComponent } from './livro-anuncio/livro-anuncio.component';
import { LivrosComponent } from './livros/livros.component';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';
import { SolicitarEmprestimoComponent } from './solicitar-emprestimo/solicitar-emprestimo.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from './services/usuarios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmprestimoConcedidoComponent } from './emprestimo-concedido/emprestimo-concedido.component';
import { EmprestimoRequiridoComponent } from './emprestimo-requirido/emprestimo-requirido.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { LivrosUserComponent } from './livros-user/livros-user.component';
import { EmprestimosUserComponent } from './emprestimos-user/emprestimos-user.component';
import { CadastroAnuncioComponent } from './cadastro-anuncio/cadastro-anuncio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { PerfilOtherUserComponent } from './perfil-other-user/perfil-other-user.component';
import { LivrosOtherUserComponent } from './livros-other-user/livros-other-user.component';
import { FormsModule } from '@angular/forms';
import { LivroComponent } from './livro/livro.component';
import { AnunciosUserComponent } from './anuncios-user/anuncios-user.component';
import { AnunciosOtherUserComponent } from './anuncios-other-user/anuncios-other-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona a rota inicial para '/home'
  { path: 'home', component: HomeComponent },
  { path: 'login-user', component: LoginUserComponent},
  { path: 'cadastro-user', component: CadastroUserComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'livro-anuncio', component: LivroAnuncioComponent },
  { path: 'cadastro-livro', component: CadastroLivroComponent },
  { path: 'perfil-user', component: PerfilUserComponent },
  { path: 'solicitar-emprestimo', component: SolicitarEmprestimoComponent },
  { path: 'emprestimo-concedido', component: EmprestimoConcedidoComponent },
  { path: 'emprestimo-requerido', component: EmprestimoRequiridoComponent },
  { path: 'avaliacao/:idAnuncio', component: AvaliacaoComponent },
  { path: 'livros-user', component: LivrosUserComponent },
  { path: 'emprestimos-user/:idUser', component: EmprestimosUserComponent },
  { path: 'cadastro-anuncio', component: CadastroAnuncioComponent },
  { path: 'livro-anuncio/:idAnuncio', component: LivroAnuncioComponent },
  { path: 'solicitar-emprestimo/:idAnuncio', component: SolicitarEmprestimoComponent },
  { path: 'emprestimo-requerido/:idAnuncio', component: EmprestimoRequiridoComponent }, 
  { path: 'emprestimo-concedido/:idAnuncio', component: EmprestimoConcedidoComponent }, 
  { path: 'perfil-other-user/:idUser', component: PerfilOtherUserComponent }, 
  { path: 'livros-other-user/:idUser', component: LivrosOtherUserComponent }, 
  { path: 'livro/:idLivro/:idUser', component: LivroComponent }, 
  { path: 'anuncios-user', component: AnunciosUserComponent }, 
  { path: 'anuncios-other-user/:idUser', component: AnunciosOtherUserComponent }, 
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginUserComponent,
    CadastroUserComponent,
    CadastroLivroComponent,
    LivroAnuncioComponent,
    LivrosComponent,
    PerfilUserComponent,
    SolicitarEmprestimoComponent,
    EmprestimoConcedidoComponent,
    EmprestimoRequiridoComponent,
    AvaliacaoComponent,
    LivrosUserComponent,
    EmprestimosUserComponent,
    CadastroAnuncioComponent,
    PerfilOtherUserComponent,
    LivrosOtherUserComponent,
    LivroComponent,
    AnunciosUserComponent,
    AnunciosOtherUserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    FormsModule
  ],
  exports: [RouterModule],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
