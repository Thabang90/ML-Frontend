import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { LoginComponent }            from '../../pages/user/login.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { ResetPasswordComponent } from 'app/pages/reset-password/reset-password.component';
import { UsersComponent } from 'app/pages/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    
    BlockUIModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ResetPasswordComponent,
    UsersComponent
  ]
})

export class AdminLayoutModule {}
