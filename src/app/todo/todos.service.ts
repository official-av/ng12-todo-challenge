import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {todo} from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private readonly todos = new BehaviorSubject<todo[]>([] as todo[]);
  public todos$ = this.todos.asObservable().pipe(
    tap(todos => {
      localStorage.clear();
      localStorage.setItem('todos', JSON.stringify(todos));
    })
  );

  constructor() {
    const todosString = localStorage.getItem('todos');
    if (todosString) {
      const todos = JSON.parse(todosString) as todo[];
      this.todos.next(todos);
    }
  }

  getAllTodos(): todo[] {
    return [...this.todos.value];
  }

  createTodo(content: string) {
    const todo = {
      id: this.getTodosLength(),
      content,
      completed: false
    } as todo;
    const todos = [...this.getAllTodos(), todo];
    this.updateTodos(todos);
  }

  deleteTodo(id: number) {
    const todos = this.getAllTodos().filter(t => t.id !== id);
    this.updateTodos(todos);
  }

  updateTodos(todos: todo[]) {
    this.todos.next(todos);
  }

  getTodosLength(): number {
    return this.getAllTodos().length;
  }

  updateTodoStatus(id: number, completed: boolean) {
    const todo = this.todos.value.find(t => t.id === id);
    if (todo) {
      todo.completed = completed;
      this.deleteTodo(id);
      const todos = [...this.getAllTodos(), todo];
      this.updateTodos(todos);
    }
  }
}
