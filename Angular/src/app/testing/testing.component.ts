import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-testing',
  standalone: true,
  imports: [
    NgIf,
    MapComponent
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent implements OnInit{

  mapVisible: boolean = true;
  rotasVisible: boolean = false;

  ngOnInit(): void {
    this.mapVisible = true;
    this.rotasVisible = false;
  }

  toggleView(selectedOption: string) {
    this.mapVisible = selectedOption === 'opt-1';
    this.rotasVisible = selectedOption === 'opt-2';
  }

}
