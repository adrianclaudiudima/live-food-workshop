import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderStatusTable} from "./components/order-status-table/order-status-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [OrderStatusTable],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [OrderStatusTable]
})
export class OrderStatusTableModule {
}
