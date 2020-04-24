import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { WarehouseErpSharedModule } from 'app/shared/shared.module';
import { WarehouseErpCoreModule } from 'app/core/core.module';
import { WarehouseErpAppRoutingModule } from './app-routing.module';
import { WarehouseErpHomeModule } from './home/home.module';
import { WarehouseErpEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { WarehouseErpDisplaysModule } from 'app/displays/displays.module';

@NgModule({
  imports: [
    BrowserModule,
    WarehouseErpSharedModule,
    WarehouseErpCoreModule,
    WarehouseErpHomeModule,
    WarehouseErpDisplaysModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    WarehouseErpEntityModule,
    WarehouseErpAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class WarehouseErpAppModule {}
