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
  public lat: number;
  public lng: number;
  parkList: Observable<string[]>;
  

  ngOnInit() {
    // Initialize the map
    let map: google.maps.Map;
    const norfolk = new google.maps.LatLng(36.9308009, -76.3097602);

    map = new google.maps.Map(
      document.getElementById('map'), { center: norfolk, zoom: 15 });

    this.getParkMap(map, norfolk);



  }

  ngAfterViewInit() {

  }
  constructor() { }

  getParkMap(gmap, LatLng) {
    const service = new google.maps.places.PlacesService(gmap);
    service.nearbySearch(
      { location: LatLng, radius: 5000, type: 'park' },
      function (results, status, pagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
              map: gmap,
              position: results[i].geometry.location,
              title: results[i].name
            });
            gmap.setCenter(results[0].geometry.location);
          }
        }
      }
    );
  }
  createMarker(places) { }


}
