import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AboutEditComponent } from "./components/about/about-edit/about-edit.component";
import { AboutComponent } from "./components/about/about.component";
import { EducationEditComponent } from "./components/education/education-edit/education-edit.component";
import { EducationComponent } from "./components/education/education.component";
import { ExperienceEditComponent } from "./components/experience/experience-edit/experience-edit.component";
import { ExperienceComponent } from "./components/experience/experience.component";
import { HardEditComponent } from "./components/hard/hard-edit/hard-edit.component";
import { HardComponent } from "./components/hard/hard.component";
import { LoginComponent } from "./components/login/login.component";
import { ProjectEditComponent } from "./components/project/project-edit/project-edit.component";
import { ProjectComponent } from "./components/project/project.component";
import { LoginGuard } from "./services/login.guard";

const routes: Routes = [
    {path: 'crear-about', component: AboutEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'green'}},
    {path: 'edit-about/:id', component: AboutEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'green'}},
    {path: 'crear-education', component:  EducationEditComponent, canActivate: [LoginGuard],data: {bodyClass: 'pink'}},
    {path: 'edit-education/:id', component:  EducationEditComponent, canActivate: [LoginGuard],data: {bodyClass: 'pink'}},
    {path: 'crear-experience', component:  ExperienceEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'verde'}},
    {path: 'edit-experience/:id', component:  ExperienceEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'verde'}},
    {path: 'crear-hard', component:  HardEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'verd'}},
    {path: 'edit-hard/:id', component:  HardEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'verd'}},
    {path: 'crear-project', component:  ProjectEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'rose'}},
    {path: 'edit-project/:id', component:  ProjectEditComponent, canActivate: [LoginGuard], data: {bodyClass: 'rose'}},
    {path: 'persona', component: AboutComponent, data: {animation: 'aboutPage', bodyClass: 'green'}},
    {path: 'experience', component: ExperienceComponent, data: {animation: 'expePage', bodyClass: 'verde'}},
    {path: 'education', component: EducationComponent,  data: {animation: 'eduPage', bodyClass: 'pink'}},
    {path: 'project', component: ProjectComponent, data: {animation: 'proPage', bodyClass: 'rose'}},
    {path: 'hard', component: HardComponent, data: {animation: 'hardPage', bodyClass: 'verd'}},
    {path: 'login', component: LoginComponent, data: {animation: 'logPage'}},
    {path: '', redirectTo: '/persona', pathMatch: 'full'},
    {path: '**', redirectTo: '/persona', pathMatch: 'full'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],   
       
})
export class AppRoutingModule {


}