import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PlaceItem from "../PlaceItem";

interface PlaceItem {
  id: string;
  name: string;
}

interface PlaceGroup {
  title: string;
  icon: string;
  items: Array<PlaceItem>;
}

interface PlaceListProps {
  places: Array<PlaceGroup>;
  onChange: (item: PlaceItem) => void;
}

const PlaceList: React.FC<PlaceListProps> = ({ places, onChange }) => {
    const handleButtonClick = (item: PlaceItem) => {
        onChange(item);
      };

  return (
    <View style={styles.listContainer}>
      {places.map((item, index) => (
        <View key={index}>
          {item.items.length > 0 ? (<Text style={styles.title}>{item.title}</Text>) : null}

          {item.items.map((element, index) => (
              <TouchableOpacity key={index} onPress={() => handleButtonClick(element)}>
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
