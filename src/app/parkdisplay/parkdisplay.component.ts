/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { } from 'googlemaps';
import { Observable } from 'rxjs';
import { reject } from 'q';

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
    // Initialize the map
    const norfolk = new google.maps.LatLng(36.9308009, -76.3097602);
    this.gmap = new google.maps.Map(
      document.getElementById('map'), { center: norfolk, zoom: 15 });

    this.getParkMap(this.gmap, norfolk)
      .then(results => {
        this.parkList = results;
        results.forEach(x =>
          this.markers.push(
            new google.maps.Marker({
              map: this.gmap,
              position: x.geometry.location,
              title: x.name
            })
          ));
      });
    // match the height of the list to the height of the map
    document.getElementById('list').style.height = document.getElementById('map').style.height;
  }

  ngAfterViewInit() {
  }

  constructor() { }

  public onClick(location) {
    if (this.checkForErrors(location)) {
      return;
    }
    this.markers.forEach(x => x.setMap(null));

    this.getLocation(location)
      .then(result => {
        this.getParkMap(this.gmap, result)
          .then(results => {
            this.parkList = results;
            results.forEach(x =>
              new google.maps.Marker({
                map: this.gmap,
                position: x.geometry.location,
                title: x.name
              })
            )
          });

      });
  }

  private getLocation(address): Promise<google.maps.LatLng> {
    return new Promise((resolve, reject) =>
      new google.maps.Geocoder().geocode(
        { address },
        (results, status) => {
          if (status !== google.maps.GeocoderStatus.OK) {
            this.errors = 'No location found.';
            reject();
          }
          resolve(results[0].geometry.location);
        }
      )
    );
  }

  private getParkMap(gmap, LatLng): Promise<google.maps.places.PlaceResult[]> {
    // promisefy
    return new Promise((resolve, reject) =>
      new google.maps.places.PlacesService(gmap)
        .nearbySearch(
          { location: LatLng, radius: 5000, type: 'park' },
          (results, status, pagination) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              reject();
            }
            this.gmap.setCenter(LatLng);
            resolve(results);
          })
    );
  }

  private checkForErrors(input): boolean {
    // clear errors
    this.errors = '';
    // check for minimum length

    if (input.length < 2) {
      this.errors = 'Please enter a valid location';
      return true;
    }
  }
}
