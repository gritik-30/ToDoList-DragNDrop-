import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  setTodo(todo: any) {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  setProgress(progress: any) {
    localStorage.setItem('todo', JSON.stringify(progress));
  }

  setDone(done: any) {
    localStorage.setItem('todo', JSON.stringify(done));
  }

  getTodo() {
    return JSON.parse(localStorage.getItem('todo') || '');
  }

  getProgress() {  
    return JSON.parse(localStorage.getItem('progress') || '');
  }

  getDone() {
    return JSON.parse(localStorage.getItem('done') || '');
  }
}