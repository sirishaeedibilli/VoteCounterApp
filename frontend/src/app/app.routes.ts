import { Routes } from '@angular/router';
import { PollComponent } from './poll/poll.component';
import { AddOptionComponent } from './add-option/add-option.component';

export const routes: Routes = [
  { path: '', redirectTo: '/poll', pathMatch: 'full' },
  { path: 'poll', component: PollComponent },
  { path: 'add', component: AddOptionComponent }
];
