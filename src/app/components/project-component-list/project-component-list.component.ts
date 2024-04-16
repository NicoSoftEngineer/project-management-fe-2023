import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectModel } from '../../models/project.interface';
import { compare } from 'fast-json-patch';

@Component({
  selector: 'app-project-component-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './project-component-list.component.html',
  styleUrl: './project-component-list.component.css',
})
export class ProjectComponentListComponent implements OnInit{

  ngOnInit(): void {
    this.projectService.getError().subscribe();
  }

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

  onPatchForm(project: ProjectModel): void {
    const data = this.formular.getRawValue();

    const oldData = { title: project.title, description: project.description};
    const operations = compare(oldData, data);

    this.projectService.patchProject(project.id, operations).subscribe({
      next: (response) => {
      
      }
    });
  }

  closeForm() {
    this.showForm = false;
    this.formular.reset();
  }

  refreshData() {
    this.projects$ = this.projectService.getProjects();
  }




 }
