import { Component, ChangeDetectorRef  } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  visible:boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  openSidebar() {
    console.log("Opening sidebar");
    this.visible = true;
    this.cdr.detectChanges();
  }

  closeSidebar() {
    console.log("Closing sidebar");
    this.visible = false;
    this.cdr.detectChanges();
  }
}
