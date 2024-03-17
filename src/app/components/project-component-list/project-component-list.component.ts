import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-component-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-component-list.component.html',
  styleUrl: './project-component-list.component.css',
})
export class ProjectComponentListComponent {

  protected readonly fb = inject(FormBuilder);

  protected readonly projectService = inject(ProjectService);

  protected formular = this.fb.group({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
  });

  projects$ = this.projectService.getProjects();

  showForm: boolean = false;

  onSubmit(): void {
    const data = this.formular.getRawValue();

    this.projectService.createProject(data).subscribe({
      next: () => {
        this.refreshData();
        this.closeForm();
      }
    })
  }

  closeForm() {
    this.showForm = false;
    this.formular.reset();
  }

  refreshData() {
    this.projects$ = this.projectService.getProjects();
  }




 }
