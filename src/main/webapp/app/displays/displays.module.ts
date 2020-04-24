import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseErpSharedModule } from 'app/shared/shared.module';
import { DISPLAYS_ROUTE } from './displays.route';

@NgModule({
  imports: [WarehouseErpSharedModule, RouterModule.forChild(DISPLAYS_ROUTE)],
  declarations: []
})
export class WarehouseErpDisplaysModule {}
