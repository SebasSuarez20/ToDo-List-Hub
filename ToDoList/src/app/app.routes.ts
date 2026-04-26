import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'splash',
    loadComponent: () => import('./component/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'todo-list',
    loadComponent: () => import('./pages/todo-list/todo-list.page').then((m) => m.TodoListPage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'task-list',
    loadComponent: () => import('./component/task-list/task-list/task-list.page').then( m => m.TaskListPage)
  }
];
