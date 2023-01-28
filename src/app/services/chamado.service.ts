import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { API_CONFIG } from 'src/config/api.config'
import { Chamado } from '../models/chamado'

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`)
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`)
  }

  create(cliente: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, cliente)
  }

  update(cliente: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(
      `${API_CONFIG.baseUrl}/chamados/${cliente.id}`,
      cliente
    )
  }
}
