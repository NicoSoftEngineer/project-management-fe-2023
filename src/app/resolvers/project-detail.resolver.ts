import { Router, type ResolveFn } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ProjectDetailModel } from '../models/project-detail.interface';

export const projectDetailResolver: ResolveFn<undefined | ProjectDetailModel> = (route, state) => {
  const projectId = route.paramMap.get('projectId');
  const router = inject(Router);

  if(!projectId) {
    // Message // Toaster 
    console.error('Project Id was not found');
    return of(undefined);
  }
  const projectService = inject(ProjectService);


  return projectService.getProject(projectId).pipe(catchError(async (err) => {
    console.log(err);
    await router.navigate(['/home']);
    throw of(err)
  }));
};
