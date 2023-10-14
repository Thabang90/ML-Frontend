import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { LoginComponent } from '../../pages/user/login.component';
import { UsersComponent } from '../../pages/users/users.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { ResetPasswordComponent } from 'app/pages/reset-password/reset-password.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'users',            component: UsersComponent },
    { path: 'typography',       component: TypographyComponent },
    { path: 'icons',            component: IconsComponent },
    { path: 'maps',             component: MapsComponent },
    { path: 'notifications',    component: NotificationsComponent },
    { path: 'upgrade',          component: UpgradeComponent },
    { path: 'reset-password',   component:ResetPasswordComponent}
];
