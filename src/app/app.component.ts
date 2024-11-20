import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// para usar formulario

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstadosService } from './services/estados/estados.service'
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // title = 'personafront';


  personaForm!: FormGroup;

  // "!:" --> afirmación no nula:  indicando que personaForm se inicializará en el método ngOnInit antes de ser utilizado.

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {
    //"fb" lo declaro tipo FormBuilder 

  }
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]

    })

  }

  guardar(): void { }


}
