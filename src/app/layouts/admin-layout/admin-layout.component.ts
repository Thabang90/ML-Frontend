import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit,AfterViewInit {
  public href: string = "";

  constructor(private router : Router,private location: Location) {}
  ngAfterViewInit(): void {
   
  }

  ngOnInit() { 
    
  }
  
}
