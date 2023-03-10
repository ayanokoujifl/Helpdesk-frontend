import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Chamado } from 'src/app/models/chamado'
import { Cliente } from 'src/app/models/cliente'
import { Tecnico } from 'src/app/models/tecnico'
import { ChamadoService } from 'src/app/services/chamado.service'
import { ClienteService } from 'src/app/services/cliente.service'
import { TecnicoService } from 'src/app/services/tecnico.service'

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent {
  ngOnInit(): void {
    this.findAllClientes()
    this.findAllTecnicos()
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

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

  titulo: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  prioridade: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private service: ChamadoService,
    private toast: ToastrService,
    private router: Router,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService
  ) {}

  findAllClientes(): void {
    this.clienteService.findAll().subscribe((res) => {
      this.clientes = res
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((res) => {
      this.tecnicos = res
    })
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacoes.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    )
  }

  create(): void {
    this.service.create(this.chamado).subscribe(
      () => {
        this.toast.success(
          `Chamado ${this.chamado.titulo} cadastrado com sucesso`,
          'Cadastro'
        )
        this.router.navigate(['chamados'])
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message)
          })
        } else {
          this.toast.error(ex.error)
        }
      }
    )
  }
}
