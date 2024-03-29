import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

const SHARED_COMPONENT = [
  BreadcrumbsComponent,
  SidebarComponent,
  HeaderComponent,
];

@NgModule({
  declarations: [SHARED_COMPONENT],

  exports: [SHARED_COMPONENT],

  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
