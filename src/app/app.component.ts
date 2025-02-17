import { Component, inject, OnInit } from '@angular/core';
// "Component: decorador para agregar funcionalidad a la clase
// OnInit: inicia ciclo de vida del componente
import { RouterOutlet } from '@angular/router'; // Permite la navegación entre diferentes componentes.


// para usar formulario
// Herramientas para crear formularios reactivos.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
// 1 - Importaciones: Se importan FormBuilder, FormGroup y Validators desde @angular/forms.

// Importas los servicios para manejar datos de países, estados y personas.
import { EstadosService } from './services/estados/estados.service'
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';
import { CommonModule } from '@angular/common'; // se importa aca y uso en html el: ngFor
//Proporciona funcionalidades comunes de Angular.
// ngIf: Permite mostrar u ocultar elementos en función de una condición.
// ngFor: Permite iterar sobre una colección y renderizar un elemento para cada ítem.
// ngSwitch: Proporciona una forma de mostrar un elemento basado en una expresión.
// ngClass: Permite agregar o quitar clases CSS dinámicamente.
// ngStyle: Permite aplicar estilos en línea de manera dinámica.
import { Observable } from 'rxjs';
import { error } from 'node:console';


@Component({
  selector: 'app-root',  // selector: Define el nombre del componente.
  standalone: true,     // standalone: Indica que este componente no depende de un módulo específico.
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule], // imports: Lista de módulos que se importan para su uso en este componente.
  templateUrl: './app.component.html', // templateUrl y styleUrls: Rutas a la plantilla HTML y a los estilos CSS del componente.
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
  // title = 'personafront';


  personaForm!: FormGroup;   // Formulario reactivo
  // "!:" --> afirmación no nula:  indicando que personaForm se inicializará en el método ngOnInit antes de ser utilizado.
  // paises: any; 


  paises$: Observable<any> | undefined; //el signo peso es una convension para saber qeu es Observable
  // Observable es una variable asincronica
  // estados: any; 
  estados$: Observable<any> | undefined; // Permite que la propiedad sea undefined si no está inicializada.  (tipo de union)
  // personaForm: Declaras el formulario que contendrá los datos de la persona.
  // paises y estados: Variables para almacenar los datos obtenidos de los servicios.

  // personaService:PersonaService = inject(PersonaService); 
  //otra forma de lamar al servicio

  personas: any[] = []; // Lista para almacenar las personas obtenidas del servicio.

  constructor(
    // 2 - Inyección: FormBuilder se inyecta en el constructor del componente.
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {
    //"fb" lo declaro tipo FormBuilder: es una clase en Angular,  Es parte del módulo ReactiveFormsModule 
    //y proporciona métodos para construir instancias de formularios reactivos

  }
  // 3 - Creación del Formulario:
  // En el método ngOnInit, se crea un FormGroup llamado personaForm con 5 controles: nombre, apellido, edad, pais y estado.
  // Se aplican validaciones a los 5 controles.
  ngOnInit(): void {  //ngOnInit se usa para inicializar el componente (la siglas ng es de Angular, saltea la A y se queda con las siguien dos letras "ng")
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],   //// Control 'nombre'
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]

    })
    // Inicialización del Formulario: Creas un FormGroup con validaciones para cada campo.
    // Obtención de Países: Llamas al servicio para obtener la lista de países y la almacenas en paises.

   
    this.paises$ = this.paisesService.getAllPaises(); // Obtención de Países: Llamas al servicio para obtener la lista de países y la almacenas en observable.


    // Esta prueba queda para despues, ahora sigo con el Observable
    //  this.personaForm.get('pais').valueChanges.subscribe(
    //   value=>{
    //     this.estadosService.getAllEstadosByPaises(value.id).subscribe(
    //       resp=> {
    //         this.estado = resp;
    //         console.log(resp);
    //       })}
    //        )

    // cargarEstadosPorPais(event: any ){

    //   this.estados$ = this.estadosService.getAllEstadosByPaises(event.target.value)

    // }

    this.personaService.getAllPersonas().subscribe({
      next: (response) => {
        console.log('Agregar persona a personas:', response);
        this.personas = response;
      },
      error: (error) => {
        alert('There was an error in retrieving data from the server');
      }
    })

  }

  guardar(): void {

    console.log("paso");
    // this.personaService.savePersona(this.personaForm.value);
    console.log("nombre capturado: " + this.personaForm.value.name);
    console.log("form: " + JSON.stringify(this.personaForm.value));
    console.log("con get: " + this.personaForm.get('nombre')?.value);
    const json = JSON.stringify(this.personaForm.value);
    console.log("json: " + json);

    const Ramon = {

      "nombre": this.personaForm.get('nombre')?.value, // el signo de interrogacion es para que espere a tener un valor para calcular el .value 
      "apellido": this.personaForm.get('apellido')?.value,  // evitando el error (null.value)
      "edad": parseInt(this.personaForm.get('edad')?.value),
      "pais": {
        "id": parseInt(this.personaForm.get('pais')?.value)
      },
      "estado": {
        "id": parseInt(this.personaForm.get('estado')?.value)
      }
    }


    this.personaService.savePersona(Ramon).subscribe({
      next: (response) => {
        console.log('Persona guardada con savePersona:', response);
        this.personaForm.reset();
        this.personas.push(Ramon);
      },
      error: (error) => {
        alert('There was an error in retrieving data from the server');
      }
    });
  }

  eliminar(persona: any): void {
    if (confirm(`¿Estás seguro de eliminar a ${persona.nombre} ${persona.apellido}?`)) {
      this.personaService.deletePersona(persona.id).subscribe({
        next: (response) => {
          console.log('Persona eliminada con deletePersona:', response);
          this.personas = this.personas.filter((p) => p.id!== persona.id);
        },
        error: (error) => {
          alert('There was an error in retrieving data from the server');
        }
      });
    }
  }

  //AGREGAR EXPLICACION
  cargarEstadosPorPais(event: any) {
    this.estados$ = this.estadosService.getAllEstadosByPaises(event.target.value)
  }
}
