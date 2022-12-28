import { Component } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ViewChild } from '@angular/core'
import { Tecnico } from 'src/app/models/tecnico'

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent {
  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Valdir',
      cpf: '12345678910',
      email: 'valdir@email.com',
      senha: '123',
      perfis: ['0'],
      dataCriacao: '10/08/2022'
    }
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes']
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}
