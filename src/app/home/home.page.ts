import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

import { Geolocation } from '@capacitor/geolocation'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	private mapbox: mapboxgl.Map;
	private lat: any
	private long: any
	
	constructor(
		
	) {
		mapboxgl.accessToken = environment.mapbox.accessToken;

	}

	ngOnInit() {
		this.getLocation()		
	}

	async getLocation() {
		const result = await Geolocation.getCurrentPosition();
		this.lat = result.coords.latitude
		this.long = result.coords.longitude

		this.initMap();
	}


	private initMap() {

		this.mapbox = new mapboxgl.Map({

			container: 'mapbox', // container ID
			
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: [this.long, this.lat], // starting center in [lng, lat]
			zoom: 17 // starting zoom
			});

		// Initialize the GeolocateControl.
		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			fitBoundsOptions:{
				maxZoom:17
			},
			trackUserLocation: true,
			showUserHeading: true,
			showUserLocation: true
		});
		// Add the control to the map.
		this.mapbox.addControl(geolocate);
		// Set an event listener that fires
		// when a trackuserlocationstart event occurs.
		this.mapbox.on('load', () => {
			geolocate.trigger();
		});
	}
}
