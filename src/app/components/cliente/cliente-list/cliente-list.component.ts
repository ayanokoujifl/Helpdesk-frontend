import { Component } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ViewChild } from '@angular/core'
import { Cliente } from 'src/app/models/cliente'
import { ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: ClienteService) {}

  ELEMENT_DATA: Cliente[] = []

  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes']

  findAll() {
    this.service.findAll().subscribe((res) => {
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA)
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
}
