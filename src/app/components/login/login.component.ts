import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { async } from 'rxjs'
import { Credenciais } from 'src/app/models/credenciais'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  logar() {
    this.service.authenticate(this.creds).subscribe(
      (resposta) => {
        this.service.successfullLogin(
          resposta.headers.get('Authorization').substring(7)
        )
        this.router.navigate(['home'])
      },
      () => {
        this.toast.error('Usuário ou senha inválidos!')
      }
    )
  }
}
