import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },
  { path: 'table', component: TableComponent },
  { path: 'chart', component: ChartComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
};