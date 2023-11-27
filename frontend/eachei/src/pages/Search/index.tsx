import { StyleSheet, View, ScrollView, Text } from "react-native";

import SearchBar from "../../components/SearchBar";
import PlaceList from "../../components/Places/PlaceList";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Search = () => {
  const [origin, setOrigin] = useState("");
  const [destiny, setDestiny] = useState("");

  let searchBarSelected = "";

  const handleOnChange = (info: any) => {
    changeSearchBarContent(info);
  };

  const handleSearchBar = (placeholder: string) => {
    console.log("vish:", placeholder);

    searchBarSelected =
      placeholder == "Informe sua origem" ? "origem" : "destino";
  };

  const changeSearchBarContent = (option: string) => {
    console.log("serafini", searchBarSelected);
    if (searchBarSelected != "") {
      searchBarSelected == "origem" ? setOrigin(option) : setDestiny(option);
    }
  };

  useEffect(() => {
    api
    .get("/acessible-route/?origin=P3&destiny=CE3P3")
    .then((response: any) => {
      console.log(response.data);
    }).catch(error => console.log(error));
}, [])

  const places = [
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
        { id: "X", name: "Anfiteatros" },
        { id: "X", name: "Biblioteca" },
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

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: 200, position: "relative" }}>
        <SearchBar
          placeholder="Informe sua origem"
          origin={origin}
          onChange={handleSearchBar}
        />
        <SearchBar
          placeholder="Informe seu destino"
          destiny={destiny}
          onChange={handleSearchBar}
        />

        <PlaceList places={places} onChange={handleOnChange} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    paddingTop: 40,
  },
});
export default Search;
