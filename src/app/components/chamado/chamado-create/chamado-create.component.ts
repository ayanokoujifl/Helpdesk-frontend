import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Chamado } from 'src/app/models/chamado'
import { ChamadoService } from 'src/app/services/chamado.service'
import { ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent {
  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    prioridade: '',
    status: '',
    titulo: '',
    descricao: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }

  titulo: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  prioridade: FormControl = new FormControl(null, [Validators.required])
  descricao: FormControl = new FormControl(null, [Validators.required])
  tecnico: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private service: ChamadoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.descricao.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    )
  }

  create(): void {
    this.service.create(this.chamado).subscribe(
      () => {
        this.toast.success(
          `Cliente ${this.chamado.descricao} cadastrado com sucesso`,
          'Cadastro'
        )
        this.router.navigate(['clientes'])
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message)
          })
        } else {
          this.toast.error(ex.error.message)
        }
      }
    )
  }
}
