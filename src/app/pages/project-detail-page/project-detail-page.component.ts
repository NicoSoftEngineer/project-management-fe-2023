import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ProjectDetailModel } from '../../models/project-detail.interface';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { compare } from 'fast-json-patch';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.css',
})
export class ProjectDetailPageComponent implements OnChanges, AfterViewInit {

  @Input() project!: ProjectDetailModel;

  protected readonly fb = inject(FormBuilder);

  protected readonly projectService = inject(ProjectService);

  showForm: boolean = false;

  protected formular = this.fb.group({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
  });

  ngOnChanges(changes: SimpleChanges): void {
  
    if(changes['project']?.currentValue) {
      const project = changes['project'].currentValue;

      this.formular.patchValue({
        title: project.title,
        description: project.description,
      });
    }
  } 

  ngAfterViewInit(): void {
    this.formular.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        const oldData = { title: this.project.title, description: this.project.description};
        const operations = compare(oldData, value);

        this.projectService.patchProject(this.project.id, operations).subscribe({
          next: (response) => {
            this.project = response;
          }
        });

        console.log(operations);
      }
    });
  }
  
}
