import { Component, OnInit } from '@angular/core';
// "Component: decorador para agregar funcionalidad a la clase
// OnInit: inicia ciclo de vida del componente
import { RouterOutlet } from '@angular/router';

// para usar formulario

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// 1 - Importaciones: Se importan FormBuilder, FormGroup y Validators desde @angular/forms.

import { EstadosService } from './services/estados/estados.service'
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  // title = 'personafront';


  personaForm!: FormGroup;
  paises: any; //AGREGAR EXPLICAION

  // "!:" --> afirmación no nula:  indicando que personaForm se inicializará en el método ngOnInit antes de ser utilizado.

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
  ngOnInit(): void {  //ngOnInit se usa para inicializar el componente
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]

    })

    // AGREGAR EXPLICACION
    this.paisesService.getAllPaises().subscribe(
      resp => {
      this.paises = resp;
      console.log(resp);
    }, 
      err => { 
        console.error(err); 
      });

  }
  guardar(): void { }


}
