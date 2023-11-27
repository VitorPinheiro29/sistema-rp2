import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../components/SearchBar";
import UniversityLogo from "../../components/UniversityLogo";

const Home = () => {
  const origin = { latitude: -23.4828757, longitude: -46.5019094 };
  const destination = { latitude: -23.483198, longitude: -46.5020074 };
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

  const handleSearchBarPress = () => {
      navigation.navigate("Search" as never);
  };

  return (
    <View style={styles.container}>
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
  },
});

export default Home;
