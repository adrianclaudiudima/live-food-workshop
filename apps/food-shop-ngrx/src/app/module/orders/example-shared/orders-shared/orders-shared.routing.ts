import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [RouterModule.forChild([{
    path: '',
    loadChildren: () => import('../../orders.module').then(v => v.OrdersModule)
  },
    {
      path: 'second-feature',
      // Second features
      loadChildren: () => import('../../orders.module').then(v => v.OrdersModule)
    }
  ])
  ],
  exports: []
})
export class OrdersSharedRouting {

}
