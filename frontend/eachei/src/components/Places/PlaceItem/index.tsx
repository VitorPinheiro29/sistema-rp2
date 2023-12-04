import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PlaceItemProps {
  title: string;
  icon: string;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ title, icon }) => {
  return (
    <TouchableWithoutFeedback style={styles.itemContainer}>
      <MaterialCommunityIcons name={icon as any} size={24} color="white" />
      <Text style={styles.item}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 0.25,
    padding: 20,
  },
  item: {
    color: "white",
    fontSize: 14,
    marginLeft: 10
  },
});

export default PlaceItem;
