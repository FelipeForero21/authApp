import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { UserFormComponent } from './user-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'actions'];
  dataSource: any[] = [];
  isAuthenticated: boolean = false; 

  constructor(
    private crudService: CrudService,
    public dialog: MatDialog,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.isAuthenticated = this.crudService.isAuthenticated(); 
  }

  loadUsers(): void {
    this.crudService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
  }

  onLogout(): void {
    this.crudService.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.componentInstance.userSaved.subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '250px',
      data: user
    });

    dialogRef.componentInstance.userSaved.subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(id: number): void {
    this.crudService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
