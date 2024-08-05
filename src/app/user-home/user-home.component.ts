import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, FormsModule,ShoppingCartComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

  users: any[] = [];
  newUser = { username: '', password: '' };
  selectedUser: any = null;
  isEditing = false;

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.crudService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  createUser(): void {
    this.crudService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
      this.newUser = { username: '', password: '' };
    });
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
  }

  deleteUser(id: number): void {
    this.crudService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }

  logout(): void {
    // Limpiar cualquier dato de sesión si es necesario
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
