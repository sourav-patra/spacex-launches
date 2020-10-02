import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid-route',
  templateUrl: './invalid-route.component.html',
  styleUrls: ['./invalid-route.component.scss']
})
export class InvalidRouteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public redirect(): void {
    this.router.navigate(['']);
  }

}
