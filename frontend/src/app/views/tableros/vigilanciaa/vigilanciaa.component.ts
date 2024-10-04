import { Component, OnInit } from '@angular/core';
import { VigilanciaService } from '../../../services/vigilancia.service';
import { PersonaService } from '../../../services/persona.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { DependenciaService } from '../../../services/dependencia.service';
import { Vigilancia } from '../../../models/vigilancia';
import { Persona } from '../../../models/persona';
import { Funcionario } from '../../../models/funcionario';
import { Dependencia } from '../../../models/dependencia';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-vigilancia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vigilanciaa.component.html',
  styleUrls: ['./vigilanciaa.component.scss']
})
export class VigilanciaaComponent implements OnInit {
  vigilancia: Vigilancia = new Vigilancia();
  dniPersona: string = '';
  legajoFuncionario: string = '';
  dependenciaSeleccionada: string = '';
  dependencias: Dependencia[] = [];
  personaExistente: Persona | null = null;
  funcionarioExistente: Funcionario | null = null;
  mensajeError: string = '';
  map!: L.Map 
  marker: L.Marker | undefined;
  
  vigilancias: Vigilancia[] = []; // Lista de vigilancias
  // Campos para archivos
  archivos: { base64: string; mimeType: string; fileName: string }[] = [
    { base64: '', mimeType: '', fileName: '' },
    { base64: '', mimeType: '', fileName: '' },
    { base64: '', mimeType: '', fileName: '' },
    { base64: '', mimeType: '', fileName: '' },
    { base64: '', mimeType: '', fileName: '' }
  ];
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private vigilanciaService: VigilanciaService,
    private personaService: PersonaService,
    private funcionarioService: FuncionarioService,
    private dependenciaService: DependenciaService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargarDependencias();
    this.cargarVigilancias(); // Cargar vigilancias al inicio
    this.initMap();
  }

  cargarDependencias(): void {
    this.dependenciaService.getDependencias().subscribe(
      data => this.dependencias = data,
      error => console.error('Error al cargar las dependencias:', error)
    );
  }
// Función para eliminar archivo por índice
eliminarArchivo(index: number): void {
  this.archivos.splice(index, 1);
}
initMap(): void {
  // Inicializa el mapa centrado en una ubicación predeterminada
  this.map = L.map('map').setView([-24.18769889437684, -65.29709953331486], 10);

  // Agregar la capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);

  // Manejar el evento de clic para obtener latitud y longitud
  this.map.on('click', (e: L.LeafletMouseEvent) => {
    this.vigilancia.latitud = e.latlng.lat.toString();
    this.vigilancia.longitud = e.latlng.lng.toString();

    // Verifica si map y marker están inicializados
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Agregar el marcador en la posición seleccionada
    this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
  });
}

mostrarUbicacion(): void {
  if (this.vigilancia.latitud && this.vigilancia.longitud) {
    const lat = parseFloat(this.vigilancia.latitud);
    const lng = parseFloat(this.vigilancia.longitud);

    // Verifica si map y marker están inicializados
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Centra el mapa en la ubicación introducida
    this.map.setView([lat, lng], 13);
    this.marker = L.marker([lat, lng]).addTo(this.map);
  }
}

actualizarMapaDesdeFormulario(): void {
  // Actualiza el mapa si las coordenadas se modifican manualmente en el formulario
  const lat = parseFloat(this.vigilancia.latitud);
  const lng = parseFloat(this.vigilancia.longitud);

  if (!isNaN(lat) && !isNaN(lng)) {
    this.map.setView([lat, lng], 13);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng]).addTo(this.map);
  }
}


  cargarVigilancias(): void {
    this.vigilanciaService.getVigilancias().subscribe(
      data => {
        console.log('Datos de vigilancias:', data); // Verifica los datos recibidos
        this.vigilancias = data;
      },
      error => console.error('Error al cargar las vigilancias:', error)
    );
  }

  buscarPersonaPorDni(): void {
    this.personaService.getPersonaByDni(this.dniPersona).subscribe(
      (data: Persona) => {
        this.personaExistente = data;
        this.vigilancia.persona = data;
        this.mensajeError = '';
      },
      error => {
        this.personaExistente = null;
        this.mensajeError = 'No se encontró a la persona con el DNI proporcionado.';
        console.error('Error al buscar persona por DNI:', error);
      }
    );
  }

  buscarFuncionarioPorLegajo(): void {
    this.funcionarioService.getFuncionarioByLegajo(this.legajoFuncionario).subscribe(
      (data: Funcionario) => {
        this.funcionarioExistente = data;
        this.vigilancia.funcionario = data;
        this.mensajeError = '';
      },
      error => {
        this.funcionarioExistente = null;
        this.mensajeError = 'No se encontró ningún funcionario con el legajo proporcionado.';
        console.error('Error al buscar funcionario por legajo:', error);
      }
    );
  }

  guardarVigilancia(): void {
    if (!this.vigilancia.persona || !this.vigilancia.persona._id) {
      this.mensajeError = 'Debe asignar una persona válida antes de guardar la vigilancia.';
      return;
    }
  
    // Verificar si hay un funcionario asignado
    if (this.funcionarioExistente && this.funcionarioExistente._id) {
      this.vigilancia.funcionario = this.funcionarioExistente;
    } else {
      this.vigilancia.funcionario = null; // Permitir que sea null si no se encuentra un funcionario
    }
   
    // Asegúrate de que archivoBase64 tenga un valor para mimeType
    // Asignar archivos
    this.vigilancia.archivo = this.archivos[0].base64;
    this.vigilancia.archivo1 = this.archivos[1].base64;
    this.vigilancia.archivo2 = this.archivos[2].base64;
    this.vigilancia.archivo3 = this.archivos[3].base64;
    this.vigilancia.archivo4 = this.archivos[4].base64;
    this.vigilancia.tipoArchivo = this.archivos[0].mimeType;
    this.vigilancia.tipoArchivo1 = this.archivos[1].mimeType;
    this.vigilancia.tipoArchivo2 = this.archivos[2].mimeType;
    this.vigilancia.tipoArchivo3 = this.archivos[3].mimeType;
    this.vigilancia.tipoArchivo4 = this.archivos[4].mimeType;
    this.vigilancia.nombreArchivo = this.archivos[0].fileName;
    this.vigilancia.nombreArchivo1 = this.archivos[1].fileName;
    this.vigilancia.nombreArchivo2 = this.archivos[2].fileName;
    this.vigilancia.nombreArchivo3 = this.archivos[3].fileName;
    this.vigilancia.nombreArchivo4 = this.archivos[4].fileName;
  
    if (this.vigilancia._id) {
      // Actualizar vigilancia existente
      this.vigilanciaService.editVigilancia(this.vigilancia._id, this.vigilancia).subscribe(
        () => {
          Swal.fire('Éxito', 'Vigilancia actualizada con éxito', 'success');
          this.resetForm();
          this.cargarVigilancias(); // Recargar la lista después de guardar
        },
        (error) => {
          this.mensajeError = 'Error al actualizar la vigilancia.';
          console.error('Error al actualizar la vigilancia:', error);
        }
      );
    } else {
      // Crear nueva vigilancia
      this.vigilanciaService.createVigilancia(this.vigilancia).subscribe(
        () => {
          Swal.fire('Éxito', 'Vigilancia creada con éxito', 'success');
          this.resetForm();
          this.cargarVigilancias(); // Recargar la lista después de guardar
        },
        (error) => {
          this.mensajeError = 'Error al crear la vigilancia.';
          console.error('Error al crear la vigilancia:', error);
        }
      );
    }
  }
  

  editarVigilancia(vigilancia: Vigilancia): void {  
    this.vigilancia = { ...vigilancia }; // Copia la vigilancia para editarla
    this.dniPersona = vigilancia.persona?.dni || '';
    this.legajoFuncionario = vigilancia.funcionario?.legajo || '';

    this.archivos = [
      { base64: vigilancia.archivo || '', mimeType: vigilancia.tipoArchivo || 'application/octet-stream', fileName: vigilancia.nombreArchivo || '' },
      { base64: vigilancia.archivo1 || '', mimeType: vigilancia.tipoArchivo1 || 'application/octet-stream', fileName: vigilancia.nombreArchivo1 || '' },
      { base64: vigilancia.archivo2 || '', mimeType: vigilancia.tipoArchivo2 || 'application/octet-stream', fileName: vigilancia.nombreArchivo2 || '' },
      { base64: vigilancia.archivo3 || '', mimeType: vigilancia.tipoArchivo3 || 'application/octet-stream', fileName: vigilancia.nombreArchivo3 || '' },
      { base64: vigilancia.archivo4 || '', mimeType: vigilancia.tipoArchivo4 || 'application/octet-stream', fileName: vigilancia.nombreArchivo4 || '' }
    ];
  }
  eliminarVigilancia(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vigilanciaService.deleteVigilancia(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'La vigilancia ha sido eliminada.', 'success');
            this.cargarVigilancias(); // Recargar la lista después de eliminar
          },
          error => {
            this.mensajeError = 'Error al eliminar la vigilancia.';
            console.error('Error al eliminar la vigilancia:', error);
          }
        );
      }
    });
  }

  resetForm(): void {
    this.vigilancia = new Vigilancia();
    this.dniPersona = '';
    this.legajoFuncionario = '';
    this.dependenciaSeleccionada = '';
    this.personaExistente = null;
    this.funcionarioExistente = null;
    this.mensajeError = '';
    this.archivos = [
      { base64: '', mimeType: '', fileName: '' },
      { base64: '', mimeType: '', fileName: '' },
      { base64: '', mimeType: '', fileName: '' },
      { base64: '', mimeType: '', fileName: '' },
      { base64: '', mimeType: '', fileName: '' }
    ];
  }

  onFileChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.archivos[index].base64 = e.target.result as string;
          this.archivos[index].mimeType = file.type;
          this.archivos[index].fileName = file.name;
          console.log(`Archivo ${index} cargado: ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    }
  }
  getArchivosVigilancia(vigilancia: Vigilancia): { base64: string; mimeType: string; fileName: string }[] {
    return [
      { base64: vigilancia.archivo || '', mimeType: vigilancia.tipoArchivo || 'application/octet-stream', fileName: vigilancia.nombreArchivo || '' },
      { base64: vigilancia.archivo1 || '', mimeType: vigilancia.tipoArchivo1 || 'application/octet-stream', fileName: vigilancia.nombreArchivo1 || '' },
      { base64: vigilancia.archivo2 || '', mimeType: vigilancia.tipoArchivo2 || 'application/octet-stream', fileName: vigilancia.nombreArchivo2 || '' },
      { base64: vigilancia.archivo3 || '', mimeType: vigilancia.tipoArchivo3 || 'application/octet-stream', fileName: vigilancia.nombreArchivo3 || '' },
      { base64: vigilancia.archivo4 || '', mimeType: vigilancia.tipoArchivo4 || 'application/octet-stream', fileName: vigilancia.nombreArchivo4 || '' }
    ];
  }
  
  getFileUrl(base64: string | undefined, mimeType: string | undefined): SafeUrl {
    
    if (!base64 || !mimeType) {
      return this.domSanitizer.bypassSecurityTrustUrl('#');
    }
  
    try {
      // Asegúrate de que el base64String esté bien formado
      const base64String = base64.replace(/^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/, '');
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    } catch {

      return this.domSanitizer.bypassSecurityTrustUrl('#');
    }
  }
  
  asignarTurno(vigilancia: any) {
    this.router.navigate(['/turnos'], { queryParams: { vigilanciaId: vigilancia._id } });
  }
}