/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { } from 'googlemaps';
import { Observable } from 'rxjs';
import { reject } from 'q';
import { ProxyService } from '../proxyservice.service';

@Component({
  selector: 'app-parkdisplay',
  templateUrl: './parkdisplay.component.html',
  styleUrls: ['./parkdisplay.component.sass']
})

export class ParkdisplayComponent implements OnInit, AfterViewInit {
  public parkList: google.maps.places.PlaceResult[];
  public markers: google.maps.Marker[] = [];
  private gmap: google.maps.Map;
  public errors: string;

  ngOnInit() {
    // Center on Norfolk. TODO: Get current user location
    const norfolk = new google.maps.LatLng(36.9308009, -76.3097602);
    // Initialize the map
    this.gmap = new google.maps.Map(
      document.getElementById('map'), { center: norfolk, zoom: 15 });

     // Get the map using the Norfolk coordinates. TODO: Add error handling 
    this.proxyService.getParkMap(this.gmap, norfolk)
      .then(results => {
        // Add to the array for binding
        this.addPushPins(results);
      });
    // match the height of the list to the height of the map
    document.getElementById('list').style.height = document.getElementById('map').style.height;
  }

  ngAfterViewInit() {
  }

  constructor(private proxyService: ProxyService) { }

  // Event handler for the button onlick. TODO: Handle the enter key being pressed
  public onClick(location) {
    // Validate the input
    if (this.checkForErrors(location)) {
      return;
    }
    // Clear the markers
    this.markers.forEach(x => x.setMap(null));

    // Geocode to get the LatLong of the location requested
    this.proxyService.getLocation(location)
      .then(result => {
        // Get the map using the LatLong from geocoding
        this.proxyService.getParkMap(this.gmap, result)
          .then(results => {
            // Re-center the map
            this.gmap.setCenter(result);
            this.addPushPins(results);
          });

      })
      // No location found. Show it on the screen.
      .catch(error => this.errors = 'No Location Found');
  }

  // Used to validate the input
  private checkForErrors(input): boolean {
    // clear errors
    this.errors = '';
    // check for minimum length

    if (input.length < 2) {
      this.errors = 'Please enter a valid location';
      return true;
    }
  }
  // Used to add markers to the map
  private addPushPins(results){
    // Add to the array for binding
    this.parkList = results;
    results.forEach(x =>
      this.markers.push(
        new google.maps.Marker({
          map: this.gmap,
          position: x.geometry.location,
          title: x.name
        })
      ));
  }
}
