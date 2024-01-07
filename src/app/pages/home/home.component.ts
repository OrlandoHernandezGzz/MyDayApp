import { Component, Inject, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  /**
   * Dentro del computed se ponen los elementos que vamos a reaccionar cuando ellos cambian.
   * Crea un nuevo estado a partir de los estados que estamos vigilando en esa funcion.
   * cada que hagamos en filter o tasks se va a ejecutar, se calculara un nuevo estado.
   */
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter( task => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter( task => task.completed);
    }

    return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$')
    ]
  });

  injector = inject(Injector);

  ngOnInit() {
    const storage = localStorage.getItem("tasks");

    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }

    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  addTask() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value;
      this.saveTask(value);
      this.newTaskCtrl.setValue('');
    }
  }

  saveTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }

    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((tasks, position) => position !== index ));
  }

  completedTask(index: number) {
    this.tasks.update((tasks) => 
      tasks.map((task, position) => {
        if (position === index) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  }

  updateTask(index: number) { 
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }  
        return task;      
      })
    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
  
}
