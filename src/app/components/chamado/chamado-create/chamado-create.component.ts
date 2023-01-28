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

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    private service: ChamadoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validaCampos(): boolean {
    return (
      this.nome.valid && this.email.valid && this.senha.valid && this.cpf.valid
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
