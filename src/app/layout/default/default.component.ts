import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css',
})
export class DefaultComponent {

  protected readonly authService = inject(AuthService);

  protected user$ = this.authService.userinfo();

  protected readonly router = inject(Router);

  logout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.router.navigate(['/login']);
      }
    })
  }
  
 }
