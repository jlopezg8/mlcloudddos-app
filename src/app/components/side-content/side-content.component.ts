import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.css']
})
export class SideContentComponent {

  isAuthenticated$ = this.auth.isAuthenticated$;
  userProfile$ = this.auth.userProfile$;

  constructor(
    private auth: AuthService,
  ) { }

}
