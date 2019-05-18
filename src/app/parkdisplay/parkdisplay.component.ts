/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { } from 'googlemaps';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parkdisplay',
  templateUrl: './parkdisplay.component.html',
  styleUrls: ['./parkdisplay.component.sass']
})

export class ParkdisplayComponent implements OnInit, AfterViewInit {
  public parkList: google.maps.places.PlaceResult[];
  public markers: google.maps.Marker[] = [];
  private gmap: google.maps.Map;

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
  }

  ngAfterViewInit() {
  }

  constructor() { }

  public onClick(location) {
    // clear markers
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
}
