import React, { useEffect, useState } from "react";
import useGoogleMapsApi from "../Partner/AddLocation/useGoogleMapsApi";
import config from "../../config";
import googleMapIcon from "/files/img/home-two/gmi.svg";
import userLocation from "/files/img/home-two/userLocation.svg";
import myLocation from "/files/img/home-two/myloc.svg";

const MapContainer = ({ locations, setVisibleLocations, center, zoom }) => {
  const GOOGLE_MAPS_API_KEY = config.GOOGLE_API_KEY;
  const isLoaded = useGoogleMapsApi(GOOGLE_MAPS_API_KEY);

  // basically all partner users' shop icon as URLOKER
  const userIcon = document.createElement("img");
  userIcon.src = userLocation;
  userIcon.width = 30;
  userIcon.height = 30;
  // client user's location icon
  const myLocIcon = document.createElement("img");
  myLocIcon.src = myLocation;
  myLocIcon.width = 30;
  myLocIcon.height = 30;
  // central icon of a city
  const markerIcon = document.createElement("img");
  markerIcon.src = googleMapIcon;
  markerIcon.width = 30;
  markerIcon.height = 30;
  const [userMarker, setUserMarker] = useState(null);
  useEffect(() => {
    if (isLoaded && window.google && window.google.maps.Map) {
      try {
        initMap();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoaded, locations, center]);

  const initMap = async () => {
    if (window.google && window.google.maps.Map) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: center || { lat: -36.8688, lng: 144.9093 },
        mapId: "mapId",
        minZoom: 5,
        controlSize: 30,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
        zoom: 12,
        maxZoom: 18,
      });
      const infoWindow = new google.maps.InfoWindow();

      const trafficLayer = new google.maps.TrafficLayer();

      // my location button
      const locationButton = document.createElement("button");
      locationButton.textContent = "";
      locationButton.classList.add("custom-map-control-button");

      if (!map) return;

      trafficLayer.setMap(map);
      const bounds = new google.maps.LatLngBounds();
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );

      const findMyLocation = () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              const { AdvancedMarkerElement } = await google.maps.importLibrary(
                "marker"
              );
              setUserMarker(
                new AdvancedMarkerElement({
                  position: pos,
                  map: map,
                  title: "You",
                  content: myLocIcon,
                })
              );

              map.setCenter(pos);
              if (
                pos.lat != userMarker.position.lat ||
                pos.lng != userMarker.position.lng
              ) {
                if (bounds.contains(userMarker.position)) {
                  bounds.extend(userMarker.position);
                }
              } else alert("You are already here");
            },
            (error) => {
              alert("Please enable location access on this site");
              console.log(error);
            }
          );
        } else {
          // Browser doesn't support Geolocation
          alert("Your browser doesn't support Geolocation");
        }
      };

      locationButton.addEventListener("click", findMyLocation);
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
      // add custom location marker
      locations.forEach((location) => {
        console.log('custom location point: ',location.coordinates);
        const marker = new AdvancedMarkerElement({
          position: {
            lat: location.coordinates.coordinates[1],
            lng: location.coordinates.coordinates[0],
          },
          map: map,
          title: location.name,

          content: markerIcon,
        });
        marker.addListener("click", () => {
          infoWindow.setOptions({
            minWidth: 250,
            maxWidth: 250,
          });
          infoWindow.setContent(
            "<div id='locationInfo'>" +
              `<img style="width:80px;height=80px;border-radius:10px" src="${
                location.pictures[0] ||
                "https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg"
              }" alt="image" />` +
              `<p id="firstHeader">${location.name}</p>` +
              `<p>${location.address.street}, ${location.address.city}</p>` +
              `<p>${location.address.state}, ${location.address.country}</p>` +
              `<p id='dist'>${new Intl.NumberFormat('en-AU',{
                maximumFractionDigits:2,
                style: 'decimal'
              }).format(Number(location.distance))} meter</p>` +
              "</div>"
          );
          infoWindow.open(map, marker);
        });
        bounds.extend(marker.position);
      });
      setUserMarker(
        new AdvancedMarkerElement({
          position: {
            lat: center ? center.lat : -36.8688,
            lng: center ? center.lng : 144.9093,
          },
          map: map,
          title: "Center of City",
          content: myLocIcon,
        })
      );
      if (userMarker) bounds.extend(userMarker.position);

      if (!center) {
        map.fitBounds(bounds);
      } else {
        map.setZoom(12); // Adjust zoom level as needed
      }

      google.maps.event.addListener(map, "idle", () => {
        updateVisibleLocations(map, locations);
      });
    } else {
      console.error("Google Maps JavaScript API not loaded properly.");
      return;
    }
  };

  const updateVisibleLocations = (map, locations) => {
    const bounds = map.getBounds();

    if (!bounds) return;

    const visibleLocations = locations.filter((location) => {
      // console.log(location.coordinates);
      const latLng = new google.maps.LatLng(
        location.coordinates.coordinates[1],
        location.coordinates.coordinates[0]
      );
      return bounds.contains(latLng);
    });

    setVisibleLocations(visibleLocations);
  };

  return (
    <div id="map" className="w-full h-full min-h-[500px] overflow-hidden"></div>
  );
};

export default MapContainer;
