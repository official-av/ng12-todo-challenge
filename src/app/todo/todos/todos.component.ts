import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {todo} from '../todo.interface';
import {TodosService} from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  // region template variables
  todos$ = this.todoService.todos$;
  activeTodos$ = this.todos$.pipe(
    map(todos => todos.filter(t => !t.completed))
  );
  completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(t => t.completed))
  );

  // endregion

  constructor(private todoService: TodosService) {
  }

  // region template helper methods
  addTodo(event: any) {
    const val = event.target.value;
    if (val.trim() !== '') { // if val not empty
      this.todoService.createTodo(val);
    }
    // reset input field
    event.target.value = '';
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  updateTodo(event: any, t: todo) {
    const completed = event.checked;
    this.todoService.updateTodoStatus(t.id, completed);
  }

  // endregion

}
