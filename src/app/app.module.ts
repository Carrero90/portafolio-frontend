import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";




import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectComponent } from './components/project/project.component';
import { HardComponent } from './components/hard/hard.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutEditComponent } from './components/about/about-edit/about-edit.component';
import { PersonaService } from './services/persona.service';
import { EducationEditComponent } from './components/education/education-edit/education-edit.component';
import { ExperienceEditComponent } from './components/experience/experience-edit/experience-edit.component';
import { EducationService } from './services/education.service';
import { HardEditComponent } from './components/hard/hard-edit/hard-edit.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ExperienceService } from './services/experience.service';
import { HardService } from './services/hard.service';
import { ProyectoService } from './services/proyecto.service';
import { LoginService } from './services/login.service';
import { InterceptorService } from './services/interceptor.service';
import { UploadService } from './services/upload.service';
import { FileService } from './services/file.service';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectComponent,
    HardComponent,
    AboutEditComponent,
    EducationEditComponent,
    ExperienceEditComponent,
    HardEditComponent,
    ProjectEditComponent
    

   
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    FormsModule
    
  ],
  providers: [PersonaService, EducationService, ExperienceService, HardService, ProyectoService, 
    LoginService, UploadService, FileService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
