import { Funcionario } from './funcionario';
import { Dependencia } from './dependencia';
import { Persona } from './persona';

export class Vigilancia {
  _id!: string;
  unidad_solicitante!: string;
  objetivo: string;
  cant_dias: number;
  fecha_inicio!: Date;
  fecha_fin!: Date;
  destino: string;
  latitud: string;
  longitud: string;
  turno_asignado: boolean;
  persona!: Persona;  
  funcionario?: Funcionario | null;  // Ahora puede ser nulo u opcional
  juridiccion!: Dependencia;  
  vigilancia!: string;
  recurso!: string;
  prioridad!: string;
  observaciones: string;
  activo: boolean;
  archivo?: string;  // Campo opcional
  archivo1?: string;
  archivo2?: string;
  archivo3?: string;
  archivo4?: string;
  archivo5?: string;
  tipoArchivo?: string;  
  nombreArchivo?: string;  
  tipoArchivo1?: string;
  nombreArchivo1?: string;
  tipoArchivo2?: string;
  nombreArchivo2?: string;
  tipoArchivo3?: string;
  nombreArchivo3?: string;
  tipoArchivo4?: string;
  nombreArchivo4?:string
  tipoArchivo5?: string;
  nombreArchivo5?: string;

  motivo_custodia:string;
  [key: string]: any;  // Firma de índice para permitir el acceso dinámico

  constructor() {
    this.unidad_solicitante="";
    this.objetivo = "";
    this.cant_dias = 0;
    this.destino = "";
    this.latitud = "";
    this.longitud = "";
    this.turno_asignado = false;
    this.persona = new Persona();  
    this.funcionario = null;  // Inicializamos como null
    this.juridiccion = new Dependencia();  

    this.observaciones = "";
    this.activo = true;
    this.archivo = "";
    this.archivo1 = "";
    this.archivo2 = "";
    this.archivo3 = "";
    this.archivo4 = "";
    this.archivo5 = "";
    this.motivo_custodia=""
  }
}
