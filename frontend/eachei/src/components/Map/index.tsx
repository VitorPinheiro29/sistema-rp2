import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface Place {
  latitude: number;
  longitude: number;
}

interface Map {
  originLatitude: number;
  destination: Place;
}

const Map: React.FC<Map> = ({ originLatitude, destination }) => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyDO-Yyz7UanOQxan8-mXjILjHyYxx7iwdM";
  const mapCustomStyle = [
    { elementType: "geometry", stylers: [{ color: "#182537" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  useEffect(() => {
    console.log("im good", originLatitude);
  });

  return (
    <MapView
      customMapStyle={mapCustomStyle}
      style={styles.map}
      minZoomLevel={16.2}
      initialRegion={{
        latitude: -23.4823571,
        longitude: -46.499998,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {originLatitude !== 0 && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#1A73E8"
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
