import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/datas/auths/AuthData';
import { Navigation } from 'src/app/utilities/helpers/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public nav:Navigation, public auth:AuthData) { }

  ngOnInit(): void {
  }

}
