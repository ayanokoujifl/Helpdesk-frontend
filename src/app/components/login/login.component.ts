import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
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

  constructor(private toast: ToastrService, private service: AuthService) {}

  logar() {
    console.log('logando')
    this.service.authenticate(this.creds).subscribe((response) => {
      console.log('logando')
      this.toast.info(response.headers.get('Authorization'))
    })
    console.log('logado')
  }
}
