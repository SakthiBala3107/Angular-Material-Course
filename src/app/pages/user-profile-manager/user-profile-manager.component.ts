import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-user-profile-manager',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './user-profile-manager.component.html',
  styleUrl: './user-profile-manager.component.scss',
})
export class UserProfileManagerComponent {
  user = {
    name: 'John Doe',
    bio: 'Angular developer & UI designer.',
  };

  readonly dialog = inject(MatDialog);
  readonly snackBar = inject(MatSnackBar);

  openDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: this.user,
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.user = res;
        this.snackBar.open('Profile Updated', 'Close', { duration: 3000 });
      }
    });
  }

  //
}
