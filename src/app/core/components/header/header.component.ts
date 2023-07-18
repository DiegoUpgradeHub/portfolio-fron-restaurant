import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public appComponent: AppComponent,
    public authService: AuthService
  ) { }

  profile() {
    this.authService.userArea();
  }

  logout() {
    this.authService.doLogout();
  }

  setEnglish(){
    this.appComponent.setAppLanguageEnglish();
  }

  setSpanish(){
    this.appComponent.setAppLanguageSpanish();
  }

}
