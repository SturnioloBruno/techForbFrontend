import { Component, Input } from '@angular/core';
import { User } from '../../../core/model/common.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  @Input()
  user!: User;
}
