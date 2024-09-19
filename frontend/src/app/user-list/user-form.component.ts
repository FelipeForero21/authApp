import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  @Output() userSaved = new EventEmitter<void>(); 
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      id: [data?.id || null],  
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: [data?.password || '', Validators.required]
    });
  }    

  onSave(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (user.id) {
        this.crudService.updateUser(user.id, user).subscribe(() => {
          this.userSaved.emit(); 
          this.dialogRef.close();
        });
      } else {
        this.crudService.createUser(user).subscribe(() => {
          this.userSaved.emit();  
          this.dialogRef.close();
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
