import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Trip } from "../models/trip";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  public editTrip(trip: Trip): void {
    console.log('Inside trip-card Component #EditTrip');
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['edit-trip']);
  }
}
