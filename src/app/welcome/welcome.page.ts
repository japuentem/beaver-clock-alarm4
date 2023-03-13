import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('/clock');
    }, 4000); // cambiar el valor a la cantidad de segundos que desees mostrar la pantalla de bienvenida
  }

  ngOnInit() {}
}
