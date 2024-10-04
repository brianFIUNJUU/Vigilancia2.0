// turnos.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from '../../../services/turno.service'; // Ajusta la ruta
import { VigilanciaService } from '../../../services/vigilancia.service';
import {PersonalService } from '../../../services/personal.service';
import { Turno } from 'src/app/models/turno';
import { CommonModule } from '@angular/common';
import { FormModule } from '@coreui/angular';
@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule,FormModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent  {
  // turno: Turno = new Turno();
  // personalList: any[] = [];
  // vigilanciaList: any[] = [];
  // message: string = '';
  // errorMessage: string = '';

  // constructor(
  //   private turnoService: TurnoService,
  //   private vigilanciaService: VigilanciaService,
  //   private personalService: PersonalService
  // ) {}

  // ngOnInit(): void {
  //   this.loadPersonal();
  //   this.loadVigilancias();
  // }

  // // Cargar lista de personal
  // loadPersonal(): void {
  //   this.personalService.getPersonales().subscribe(
  //     (data) => this.personalList = data,
  //     (error) => this.errorMessage = 'Error al cargar el personal'
  //   );
  // }

  // // Cargar lista de vigilancias
  // loadVigilancias(): void {
  //   this.vigilanciaService.getVigilancias().subscribe(
  //     (data) => this.vigilanciaList = data,
  //     (error) => this.errorMessage = 'Error al cargar las vigilancias'
  //   );
  // }

  // // Enviar formulario para crear y asignar un turno
  // onSubmit(): void {
  //   this.turnoService.crearTurno(this.turno).subscribe(
  //     (response) => {
  //       this.message = 'Turno asignado exitosamente';
  //       this.errorMessage = '';
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error al asignar el turno';
  //       this.message = '';
  //     }
  //   );
  // }
}