import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    name: 'componentes',
    title: true
  },
  
  
  {
    name: 'Gestión de Vigilancias',
    url: '/tableros',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Formulario de Vigilancia',
        url: '/tableros/vigilanciaa',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Gestion de turnos de vigilancias',
        url: '/tableros/turnos',
        icon: 'nav-icon-bullet'
      },
      
    ]
  },

  {
    name: 'Formularios',
    url: '/tableros',
    iconComponent: { name: 'cil-chart' },
    children: [
 
      {
        name: 'persona',
        url: '/tableros/persona',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'personal',
        url: '/tableros/personal',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'dependencia',
        url: '/tableros/dependencia',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'funcionario',
        url: '/tableros/funcionario',
        icon: 'nav-icon-bullet'
      },
      
     
    ]
  },
  
  {
    name: 'Tableros',
    url: '/tableros',
    iconComponent: { name: 'cil-chart' },
    children: [
 
      {
        name: 'Contravenciones',
        url: '/tableros/vigilancia',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Vigilancia y escuela',
        url: '/tableros/escuela',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Delito contra la propiedad',
        url: '/tableros/delito',
        icon: 'nav-icon-bullet'
      }
      ,
      {
        name: 'Violencia de genero',
        url: '/tableros/violencia',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  
  {
    name: 'Gestion de Usuarios',
    url: '/login',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Usuarios',
        url: '/tableros/usuario',
        icon: 'nav-icon-bullet'
      }
     
    ]
  }
  ,
 
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: '¡Contactenos!',
    url: 'https://observatorio.seguridad.jujuy.gob.ar/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
