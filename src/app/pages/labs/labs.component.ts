import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  // welcome = 'Hola!';
  // tasks = signal([
  //   'Instalar en angular cli',
  //   'Crear el proyecto',
  //   'Crear componentes'
  // ]);
  // name = signal('Orlando');
  // counter = signal(0);
  // age = 24;
  // disabled = true;
  // img = 'https://w3schools.com/howto/img_avatar.png';

  // person = {
  //   name: 'Orlando',
  //   age: 24,
  //   avatar: 'https://w3schools.com/howto/img_avatar.png'
  // }

  // clickHandler() {
  //   alert("Hola Mundo desde mi componente");
  // }

  // keydownHandler(event: KeyboardEvent) {
  //   const input = event.target as HTMLInputElement;
  //   console.log(input.value);
  // }

  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newValue = input.value;
  //   this.name.set(newValue);
  // }

  // keyUpHandler(event: KeyboardEvent) {
  //   const input = event.target as HTMLInputElement;
  //   const newValue = input.value;
  //   this.name.set(newValue);
  // }

  // increase() {
  //   console.log(this.counter());
  //   this.counter.update(value => value + 1)
  // }

  person = signal({
    name: 'Orlando',
    age: 5,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  name = signal('Orlando');

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });

  nameCtrl = new FormControl('Orlando', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  
  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })
  }


  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue)
      }
    })
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    })
  }

}
