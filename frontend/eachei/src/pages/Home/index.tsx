import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useRoute } from "@react-navigation/native";

import UniversityLogo from "../../components/UniversityLogo";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { useIsFocused } from '@react-navigation/native';


const Home = () => {
  const [origin, setOrigin] = useState({latitude: 0, longitude: 0})
  const [destination, setDestination] = useState({latitude: 0, longitude: 0 })
  const rerenderCounterRef = useRef(0);
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

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const routeParams = route.params as any;

  const handleSearchBarPress = () => {
      navigation.navigate("Search" as never);
  };

  useEffect(() => {
    setTimeout(() => {
      if (routeParams) {
        api
        .get(`/acessible-route/?origin=${routeParams.originId}&destiny=${routeParams.destinyId}`)
        .then((response: any) => {
          console.log(parseFloat(response.data.origin.latitude));
          origin.latitude = parseFloat(response.data.origin.latitude)
          origin.longitude = parseFloat(response.data.origin.longitude)
  
          destination.latitude = parseFloat(response.data.destiny.latitude)
          destination.longitude = parseFloat(response.data.destiny.longitude)
  
          setOrigin(origin)
          setDestination(destination)
          rerenderCounterRef.current += 1;
        })
        .catch((error) => console.log(error));
      }
    }, 200)
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <MapView
        key={rerenderCounterRef.current}
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
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#1A73E8"
        />
      </MapView>

      <View style={styles.searchBarContainer}>
        <TouchableOpacity onPress={handleSearchBarPress}>
          <View style={styles.button}>
            <UniversityLogo />
            <Text style={styles.buttonText}>Pesquisar trajeto</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263c3f",
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 0,
    padding: 10,
    width: "90%",
  },
  button: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: "#453f51",
    color: "white",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#767676"
  }
});

export default Home;
