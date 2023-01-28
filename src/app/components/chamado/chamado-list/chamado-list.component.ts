import { Component, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Chamado } from 'src/app/models/chamado'
import { ChamadoService } from 'src/app/services/chamado.service'

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: ChamadoService) {}

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA)
  displayedColumns: string[] = [
    'id',
    'titulo',
    'dataAbertura',
    'prioridade',
    'status',
    'cliente',
    'tecnico',
    'acoes'
  ]

  findAll() {
    this.service.findAll().subscribe((res) => {
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA)
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void {
    this.findAll()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'Aberto'
    } else if (status == '1') {
      return 'Andamento'
    } else {
      return 'Encerrado'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'Baixa'
    } else if (prioridade == '1') {
      return 'Média'
    } else {
      return 'Alta'
    }
  }

  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach((element) => {
      if (element.status == status) {
        list.push(element)
      }
    })
    this.FILTERED_DATA = list
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA)
    this.dataSource.paginator = this.paginator
  }
}
