import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http: HttpClient) { }

  registrarAnuncio(anuncioData: any) {
    return this.http.post(environment.apiUrl+'/api/registerAnuncio', anuncioData);
  }

  listarAnuncios() {
    return this.http.get(environment.apiUrl+'/api/todosAnuncios');
  }

  listarAnunciosRecentes() {
    return this.http.get(environment.apiUrl+'/api/cincoRecentes');
  }

  listarAnunciosDono(idDono: any) {
    return this.http.get(`${environment.apiUrl}/api/anunciosPorIdDono/${idDono}`);
  }

  anuncioPorId(id: any) {
    return this.http.get(`${environment.apiUrl}/api/anuncioPorId/${id}`);
  }

  solicitarEmprestimo(idAnuncio: any, emprestimoData: any) {
    return this.http.put(`${environment.apiUrl}/api/solicitarEmprestimo/${idAnuncio}`, emprestimoData);
  }

  concederEmprestimo(idAnuncio: any, emprestimoData: any) {
    return this.http.put(`${environment.apiUrl}/api/concederEmprestimo/${idAnuncio}`, emprestimoData);
  }

  encerrarEmprestimo(idAnuncio: any, emprestimoData: any) {
    return this.http.put(`${environment.apiUrl}/api/encerrarEmprestimo/${idAnuncio}`, emprestimoData);
  }

  avaliarEmprestimo(idAnuncio: any, emprestimoData: any) {
    return this.http.put(`${environment.apiUrl}/api/avaliarEmprestimo/${idAnuncio}`, emprestimoData);
  }

  listarMeusEmprestimos(id: any) {
    return this.http.get(`${environment.apiUrl}/api/meusEmprestimos/${id}`);
  }
 
}
