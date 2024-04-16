import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../models/project.interface';
import { ProjectCreateModel } from '../models/project-create.interface';
import { ProjectDetailModel } from '../models/project-detail.interface';
import { Operation } from 'fast-json-patch';

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

  getProject(id: string): Observable<ProjectDetailModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ProjectDetailModel>(url);
  }

  getError(): Observable<ProjectDetailModel> {
    const url = `${this.baseUrl}/error`;
    return this.httpClient.get<ProjectDetailModel>(url);
  }

  createProject(data: ProjectCreateModel): Observable<ProjectModel> {
    const url = this.baseUrl;
    return this.httpClient.post<ProjectModel>(url, data);
  }

  patchProject(projectId: string, data: Operation[]): Observable<ProjectModel> {
    const url = `${this.baseUrl}/${projectId}`;
    return this.httpClient.patch<ProjectModel>(url, data);
  }
}
