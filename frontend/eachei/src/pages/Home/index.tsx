import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import UniversityLogo from "../../components/UniversityLogo";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { useIsFocused } from "@react-navigation/native";
import Dialog from "../../components/Dialog/indext";
import Map from "../../components/Map";
import Bottomsheet from "../../components/Bottomsheet";

const Home = () => {
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });
  const [wayNotFound, setWayNotFound] = useState(false);
  const rerenderCounterRef = useRef(0);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const routeParams = route.params as any;

  const handleSearchBarPress = () => {
    navigation.navigate("Search" as never);
  };

  useEffect(() => {
    setWayNotFound(false);
    if (routeParams) {
      api
        .get(
          `/acessible-route/?origin=${routeParams.originId}&originName=${routeParams.originName}&destiny=${routeParams.destinyId}&destinyName=${routeParams.destinyName}`
        )
        .then((response: any) => {
          origin.latitude = parseFloat(response.data.origin.latitude);
          origin.longitude = parseFloat(response.data.origin.longitude);

          destination.latitude = parseFloat(response.data.destiny.latitude);
          destination.longitude = parseFloat(response.data.destiny.longitude);

          setOrigin(origin);
          setDestination(destination);

          console.log("mangueira");
          setWayNotFound(false);
          rerenderCounterRef.current += 1;
          setWayNotFound(false);
        })
        .catch((error: Error) => {
          console.log("fuleragem");
          rerenderCounterRef.current += 1;
          setWayNotFound(true);
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Map key={rerenderCounterRef.current} originLatitude={origin.latitude} destination={destination}/>

      <View style={styles.searchBarContainer}>
        <TouchableWithoutFeedback onPress={handleSearchBarPress}>
          <View style={styles.button}>
            <UniversityLogo />
            <Text style={styles.buttonText}>Pesquisar trajeto</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {wayNotFound && (
        <Dialog
          type="error"
          message={`Não encontramos uma rota entre ${routeParams.originName} e ${routeParams.destinyName}. Por favor, faça uma nova pesquisa para outro local.`}
        />
      )}

      <Bottomsheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
    color: "white",
  },
});

export default Home;
