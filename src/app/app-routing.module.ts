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
    {path: 'crear-about', component: AboutEditComponent, canActivate: [LoginGuard]},
    {path: 'edit-about/:id', component: AboutEditComponent, canActivate: [LoginGuard]},
    {path: 'crear-education', component:  EducationEditComponent, canActivate: [LoginGuard]},
    {path: 'edit-education/:id', component:  EducationEditComponent, canActivate: [LoginGuard]},
    {path: 'crear-experience', component:  ExperienceEditComponent, canActivate: [LoginGuard]},
    {path: 'edit-experience/:id', component:  ExperienceEditComponent, canActivate: [LoginGuard]},
    {path: 'crear-hard', component:  HardEditComponent, canActivate: [LoginGuard]},
    {path: 'edit-hard/:id', component:  HardEditComponent, canActivate: [LoginGuard]},
    {path: 'crear-project', component:  ProjectEditComponent, canActivate: [LoginGuard]},
    {path: 'edit-project/:id', component:  ProjectEditComponent, canActivate: [LoginGuard]},
    {path: 'persona', component: AboutComponent, data: {animation: 'aboutPage'}},
    {path: 'experience', component: ExperienceComponent, data: {animation: 'expePage'}},
    {path: 'education', component: EducationComponent,  data: {animation: 'eduPage'}},
    {path: 'project', component: ProjectComponent, data: {animation: 'proPage'}},
    {path: 'hard', component: HardComponent,data: {animation: 'hardPage'}},
    {path: 'login', component: LoginComponent, data: {animation: 'logPage'}},
    {path: '', redirectTo: '/persona', pathMatch: 'full'},
    {path: '**', redirectTo: '/persona', pathMatch: 'full'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]   
    
})
export class AppRoutingModule {


}