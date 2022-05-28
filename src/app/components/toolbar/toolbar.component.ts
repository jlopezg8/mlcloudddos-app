import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() toggleSidenav = new EventEmitter();
  isLoggedIn$ = this.auth.isAuthenticated$;

  constructor(
    private auth: AuthService,
  ) { }

  signOut() {
    this.auth.signOut();
  }

}
