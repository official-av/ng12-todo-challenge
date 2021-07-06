import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodosComponent} from './todos/todos.component';
import {SharedModule} from '../shared/shared.module';
import {TodosService} from './todos.service';


@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ],
  providers: [TodosService]
})
export class TodoModule {
}
