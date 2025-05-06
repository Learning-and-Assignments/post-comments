import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Output() userSelected = new EventEmitter<number>();
  users: any[] = [];
  loading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loading = true;
    this.api.getUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  selectedUserId: number | null = null;
  selectedUserName: string | null = null;

  selectUser(user: any): void {
    this.selectedUserId = user.id;
    this.selectedUserName = user.name;
    this.userSelected.emit(user.id); // if needed
  }
}
