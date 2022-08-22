import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private todoservice: TodoService) { }

  todo :any = [];
  progress :any = [];
  done :any = [];

  todoEmpty: boolean = false;
  progressEmpty: boolean = false;
  doneEmpty: boolean = false;

  todoForm = this.fb.group({
    task: ['',Validators.required]
  })


  ngOnInit(): void {
    this.todo = this.todoservice.getTodo();
    this.progress = this.todoservice.getProgress();
    this.done = this.todoservice.getDone();
    this.checkEmptyArray()
  }

  addTask() {
    this.todo.push(this.todoForm.value.task);
    this.todoservice.setTodo(this.todo)
    this.todoForm.reset();
    this.checkEmptyArray()
  }

  delete(item: any) {
    const index = this.todo.indexOf(item);
    this.todo.splice(index, 1);
    this.checkEmptyArray()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.checkEmptyArray()
  }

  checkEmptyArray() {
    this.todoEmpty = this.todo.length === 0 ? true : false;
    this.progressEmpty = this.progress.length === 0 ? true : false;
    this.doneEmpty = this.done.length === 0 ? true : false;
    // console.log(this.todo)
    // console.log(this.progress)
  }
}
