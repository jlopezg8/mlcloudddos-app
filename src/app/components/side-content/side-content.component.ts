import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent {

  isAdmin$ = this.auth.isAdmin$;
  isAuthenticated$ = this.auth.isAuthenticated$;

  constructor(
    private auth: AuthService,
  ) { }

}
