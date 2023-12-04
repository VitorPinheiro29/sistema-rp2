import { StyleSheet, View, ScrollView, Text } from "react-native";

import SearchBar from "../../components/SearchBar";
import PlaceList from "../../components/Places/PlaceList";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import PlaceItem from "../../components/Places/PlaceItem";

interface PlaceItem {
  id: string;
  name: string;
}

const Search = () => {
  const navigation = useNavigation();

  const [originName, setOriginName] = useState("");
  const [destinyName, setDestinyName] = useState("");
  const [originId, setOriginId] = useState("");
  const [destinyId, setDestinyId] = useState("");
  const [searchText, setSearchText] = useState("");

  let places = [
    {
      title: "Portarias",
      icon: "boom-gate-outline",
      items: [
        { id: "P1", name: "Portaria 1 (Carros)" },
        { id: "P2", name: "Portaria 2 (Entregas)" },
        { id: "P3", name: "Portaria 3 (Pedestres)" },
      ],
    },
    {
      title: "Prédios",
      icon: "office-building-marker-outline",
      items: [
        { id: "X", name: "Titanic" },
        { id: "X", name: "Elefante Branco" },
        { id: "X", name: "Ciclo Básico (CB)" },
        { id: "I5", name: "Anfiteatros" },
        { id: "I3", name: "Biblioteca" },
        { id: "X", name: "Gráfica" },
        { id: "X", name: "Ginásio" },
        { id: "X", name: "Serviço de Saúde (UBAS Leste)" },
        { id: "X", name: "Incubadora Social e Tecnológica (Habits)" },
        { id: "X", name: "Quadras externas (Ginásio novo)" },
      ],
    },
    {
      title: "Estacionamentos",
      icon: "car-brake-parking",
      items: [
        { id: "E1", name: "Estacionamento 1" },
        { id: "E2", name: "Estacionamento 2" },
        { id: "E3", name: "Estacionamento 3" },
        { id: "E4", name: "Estacionamento 4" },
        { id: "E5", name: "Estacionamento 5" },
        { id: "E6", name: "Estacionamento 6" },
        { id: "E7", name: "Estacionamento 7" },
      ],
    },
    {
      title: "Locais futuros",
      icon: "hammer-screwdriver",
      items: [
        { id: "Y", name: "Escola Politécnica Leste" },
        { id: "Y", name: "Laboratório Centro Dia Idoso" },
        { id: "Y", name: "Bosque da Chaminé" },
        { id: "Y", name: "Casa da Ciência" },
        { id: "Y", name: "Centro de Convenções" },
        { id: "Y", name: "Centro de Cultura e Exposições" },
        { id: "Y", name: "Piscina" },
        { id: "Y", name: "Coordenadoria Campus Leste" },
      ],
    },
  ];

  let searchBarSelected = "";

  const handleOnChange = (info: PlaceItem) => {
    console.log("shape of you", info);
    changeSearchBarContent(info);
  };

  const handleSearchBar = (placeholder: string) => {
    searchBarSelected =
      placeholder == "Informe sua origem" ? "origem" : "destino";

    setSearchText("");
    console.log(searchText);
  };

  const changeSearchBarContent = (option: PlaceItem) => {
    if (searchBarSelected != "") {
      searchBarSelected == "origem" ? setOriginInfos(option) : setDestinyInfos(option);
    }
  };

  const setOriginInfos = (option: PlaceItem) => {
    setOriginName(option.name);
    setOriginId(option.id);
  }
  const setDestinyInfos = (option: PlaceItem) => {
    setDestinyName(option.name);
    setDestinyId(option.id);
  }

  const sendRoute = () => {
    console.log("origem: ", originId);
    console.log("destino: ", destinyId);
    navigation.navigate(
      "Home" as never,
      { originId: originId, originName: originName, destinyId: destinyId, destinyName: destinyName} as never
    );
  };

  const handleBackIcon = () => {
    navigation.navigate("Home" as never);
  };

  const handleTextTyped = (textTyped: string) => {
    setSearchText(textTyped);
  };

  const filteredPlaces = places.map((place) => ({
    ...place,
    items: place.items.filter((item) =>
      item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          searchText
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    ),
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Ionicons
          style={{ paddingLeft: 16, paddingTop: 16 }}
          name="arrow-back-sharp"
          size={24}
          color="white"
          onPress={handleBackIcon}
        />
        <View style={styles.search}>
          <View style={styles.icons}>
            <MaterialIcons name="trip-origin" size={24} color="white" />
            <Entypo name="dots-three-vertical" size={18} color="#767676" />
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color="white"
            />
          </View>
          <View style={styles.bars}>
            <SearchBar
              placeholder="Informe sua origem"
              origin={originName}
              onChange={handleSearchBar}
              onChangeTextTyped={handleTextTyped}
            />
            <SearchBar
              placeholder="Informe seu destino"
              destiny={destinyName}
              onChange={handleSearchBar}
              onChangeTextTyped={handleTextTyped}
            />
          </View>
        </View>

        <PlaceList places={filteredPlaces} onChange={handleOnChange} />
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 0,
          borderColor: "red",
          width: 140,
          height: 50,
        }}
      >
        <TouchableOpacity style={styles.fixedButton} onPress={sendRoute}>
          <MaterialCommunityIcons
            name={"navigation-outline" as any}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText} onPress={sendRoute}>
            Ver trajeto
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    paddingTop: 40,
  },
  search: {
    display: "flex",
    flexDirection: "row",
  },
  icons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    marginTop: 28,
    height: 90,
  },
  bars: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  fixedButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 50,
    bottom: 0,
    backgroundColor: "#8758B6",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default Search;
