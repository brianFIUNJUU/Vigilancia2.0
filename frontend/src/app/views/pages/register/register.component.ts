import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticateService } from '../../../services/authenticate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule]
})
export class RegisterComponent {
  public email: string = '';
  public password: string = '';
  public repeatpassword: string = '';
  public perfil: string = 'usuario'; // Por defecto, el perfil será "usuario"
  public nombre: string = ''; // Agregar la propiedad nombre}
  public legajo: string='';
  public estado:boolean = false;
  public message: string = '';
  public type: string = '';
  public loadingregister: boolean = false;

  constructor(private authService: AuthenticateService) {}

  register() {
    // Validación básica de los campos del formulario
    if (this.email === '' || this.password === '' || this.repeatpassword === '' || this.nombre === '') {
      this.message = "Error: Introduzca un nombre, un email válido y contraseñas.";
      this.type = "danger";
      return; // Detener el registro
    }
  
    // Validación de que las contraseñas coincidan
    if (this.password !== this.repeatpassword) {
      this.message = "Error: Las contraseñas no coinciden.";
      this.type = "danger";
      return; // Detener el registro
    }
  
    this.loadingregister = true;
  
    // Registrar el usuario en Firebase Authentication y crear su perfil en Firestore
    this.authService.register(this.email, this.password, this.nombre,this.perfil,this.legajo,this.estado) // Pasar nombre aquí
      .then(() => {
        // Registro exitoso
        this.message = "Usuario registrado correctamente. Revise su correo para confirmar el registro.";
        this.type = "success";
        this.loadingregister = false;
      })
      .catch((error) => {
        // Manejo de errores
        this.message = "Error: " + error.message;
        this.type = "danger";
        this.loadingregister = false;
      });
  }
}