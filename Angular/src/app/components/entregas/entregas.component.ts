import {Component, OnInit} from '@angular/core';
import {MapComponent} from "../../map/map.component";
import {NgIf} from "@angular/common";
import {LeftBarComponent} from "../../elements/left-bar/left-bar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entregas',
  standalone: true,
    imports: [
        MapComponent,
        NgIf,
        LeftBarComponent
    ],
  templateUrl: './entregas.component.html',
  styleUrl: './entregas.component.css'
})
export class EntregasComponent implements OnInit {
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
