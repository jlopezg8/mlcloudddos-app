import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() closeSidenav = new EventEmitter();
  isLoggedIn$ = this.auth.isAuthenticated$;
  @Output() toggleSidenav = new EventEmitter();

  constructor(
    private auth: AuthService,
  ) { }

  signOut() {
    this.auth.signOut();
  }

}
