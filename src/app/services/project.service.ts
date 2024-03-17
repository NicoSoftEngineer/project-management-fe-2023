import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../models/project.interface';
import { ProjectCreateModel } from '../models/project-create.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  protected readonly httpClient = inject(HttpClient);

  protected readonly baseUrl = '/api/v1/Project';

  getProjects(): Observable<ProjectModel[]> {
    const url = this.baseUrl;
    return this.httpClient.get<ProjectModel[]>(url);
  }

  getProject(id: string): Observable<ProjectModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ProjectModel>(url);
  }

  createProject(data: ProjectCreateModel): Observable<ProjectModel> {
    const url = this.baseUrl;
    return this.httpClient.post<ProjectModel>(url, data);
  }
}
