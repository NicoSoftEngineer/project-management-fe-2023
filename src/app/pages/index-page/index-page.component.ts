import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectComponentListComponent } from '../../components/project-component-list/project-component-list.component';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [
    CommonModule,
    ProjectComponentListComponent,
  ],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.css',
})
export class IndexPageComponent { }
