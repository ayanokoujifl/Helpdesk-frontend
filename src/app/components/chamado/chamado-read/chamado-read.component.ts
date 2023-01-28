import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Chamado } from 'src/app/models/chamado'
import { ChamadoService } from 'src/app/services/chamado.service'

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent {
  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  constructor(
    private service: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {}

  findById(): void {
    this.service.findById(this.chamado.id).subscribe(
      (res) => {
        this.chamado = res
      },
      (ex) => {
        this.toast.error(ex.error.error)
      }
    )
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
}
