// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [CrudService, AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = { id: 0, username: "" }
  users: any[] = [];
  newUser = { username: '', password: '' };
  selectedUser: any = null;
  isEditing = false;

  alert: { type: string, message: string } | null = null;

  showAlert(type: string, message: string): void {
    this.alert = { type, message };
    setTimeout(() => {
      this.closeAlert();
    }, 3000); // La alerta se cerrará después de 3 segundos
  }

  closeAlert(): void {
    this.alert = null;
  }

  DeleteConfirm(username: string, id: number): void {
    this.user.id = id;
    this.user.username = username;
  }

  constructor(private crudService: CrudService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      } else {
        this.getUsers();  // Asegúrate de que este método se llame correctamente
      }
    });
  }


  getUsers(): void {
    this.crudService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }


  createUser(): void {
    this.crudService.createUser(this.newUser).subscribe(
      response => {
        console.log('Usuario creado:', response);
        this.getUsers();
        this.newUser = { username: '', password: '' };
        this.showAlert('success', 'Usuario creado exitosamente.');
      },
      error => {
        console.error('Error al crear usuario:', error);
        this.showAlert('danger', 'Error al crear usuario.');
      }
    );
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  updateUser(): void {
    this.crudService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      this.getUsers();
      this.cancelEdit();
    });
    this.showAlert('info', 'Usuario actualizado exitosamente.');
    console.log(this.selectedUser.id);
  }

  deleteUser(id: number): void {
    this.crudService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
    this.showAlert('danger', 'Usuario eliminado exitosamente.');
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
