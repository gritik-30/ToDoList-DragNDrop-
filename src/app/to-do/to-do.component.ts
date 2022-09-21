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

  showEditBox!: boolean;
  updateIndex!: number;

  todoForm = this.fb.group({
    task: ['',Validators.required]
  });

  updateTodoForm = this.fb.group({
    task: ['',Validators.required]
  });


  ngOnInit(): void {
    this.showEditBox = false;
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

  edit(item: any) {
    this.showEditBox = true;
    this.updateTodoForm.controls.task.setValue(item)
    this.updateIndex = this.todo.indexOf(item);
  }

  updateTask() {
    this.showEditBox = false;
    this.todo[this.updateIndex] = this.updateTodoForm.controls.task.value
    this.todoservice.setTodo(this.todo)
  }

  cancelTask() {
    this.showEditBox = false;
  }

  delete(item: any) {
    const index = this.todo.indexOf(item);
    this.todo.splice(index, 1);
    this.todoservice.setTodo(this.todo)
    this.checkEmptyArray()
  }

  deleteInProgress(item: any) {
    const index = this.progress.indexOf(item);
    this.progress.splice(index, 1);
    this.todoservice.setProgress(this.progress)
    this.checkEmptyArray()
  }

  deleteInDone(item: any) {
    const index = this.done.indexOf(item);
    this.done.splice(index, 1);
    this.todoservice.setDone(this.done)
    this.checkEmptyArray()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex-1, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex-1,
        event.currentIndex,
      );
    this.todoservice.setTodo(this.todo)
    this.todoservice.setProgress(this.progress)
    this.todoservice.setDone(this.done)
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
