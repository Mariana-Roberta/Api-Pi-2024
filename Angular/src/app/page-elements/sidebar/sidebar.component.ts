import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() visible: boolean = true;

  @Output() sidebarClosed = new EventEmitter<void>();

  closeSidebar() {
    console.log("Sidebar close method called");
    this.sidebarClosed.emit();
  }
}
