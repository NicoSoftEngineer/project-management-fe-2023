import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DefaultComponent } from './layout/default/default.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProjectDetailPageComponent } from './pages/project-detail-page/project-detail-page.component';
import { projectDetailResolver } from './resolvers/project-detail.resolver';
import { NotFoundPageComponent } from './pages/errors/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '', component: DefaultComponent, children: [
            { path: 'register', component: RegisterPageComponent, title: 'Registrace' },
            { path: 'login', component: LoginPageComponent, title: 'Login' },
            { path: 'home', component: IndexPageComponent, title: 'Home' },
            { path: 'project/detail/:projectId', component: ProjectDetailPageComponent, title: 'Project Detail',
                resolve: { project: projectDetailResolver }
            },
            { path: 'not-found', component: NotFoundPageComponent, title: 'Not Found '}
        ]
    },
    { path: '**', redirectTo: '/not-found'}
];
