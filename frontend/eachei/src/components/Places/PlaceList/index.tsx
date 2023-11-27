import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PlaceItem from "../PlaceItem";

interface PlaceItems {
  id: string;
  name: string;
}

interface PlaceGroup {
  title: string;
  icon: string;
  items: Array<PlaceItems>;
}

interface PlaceListProps {
  places: Array<PlaceGroup>;
  onChange: (info: string) => void;
}

const PlaceList: React.FC<PlaceListProps> = ({ places, onChange }) => {
    const handleButtonClick = (name: string) => {
        onChange(name);
      };

  return (
    <View style={styles.listContainer}>
      {places.map((item, index) => (
        <View key={index}>
          <Text style={styles.title}>{item.title}</Text>

          {item.items.map((element, index) => (
              <TouchableOpacity key={index} onPress={() => handleButtonClick(element.name)}>
                <PlaceItem title={element.name} icon={item.icon} />
              </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 25,
  },
});

export default PlaceList;
