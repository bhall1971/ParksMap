/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { } from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor() { }
  getLocation(address): Promise<google.maps.LatLng> {
    return new Promise((resolve, reject) =>
      new google.maps.Geocoder().geocode(
        { address },
        (results, status) => {
          if (status !== google.maps.GeocoderStatus.OK) {
            reject();
          }
          // Only need the top result
          resolve(results[0].geometry.location);
        }
      )
    );
  }
  getParkMap(gmap, LatLng): Promise<google.maps.places.PlaceResult[]> {
    // Using Promise - I'm a bit new to it
    return new Promise((resolve, reject) =>
      new google.maps.places.PlacesService(gmap)
        .nearbySearch(
          { location: LatLng, radius: 5000, type: 'park' },
          (results, status, pagination) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              reject();
            }
            // this.gmap.setCenter(LatLng);
            resolve(results);
          })
    );
  }
}
