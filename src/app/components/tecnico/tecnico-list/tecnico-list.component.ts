import { Component } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ViewChild } from '@angular/core'
import { Tecnico } from 'src/app/models/tecnico'
import { TecnicoService } from 'src/app/services/tecnico.service'

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: TecnicoService) {}

  ELEMENT_DATA: Tecnico[] = []

  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes']

  findAll() {
    this.service.findAll().subscribe((res) => {
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA)
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
