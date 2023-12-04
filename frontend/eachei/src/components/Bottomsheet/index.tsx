import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ImagePaths = {
  [key: string]: number; // Ou você pode usar ImageSourcePropType se quiser ser mais preciso
};

const Bottomsheet = () => {
  const [isActive, setIsActive] = useState<number>(1);

  const imagePaths: ImagePaths = {
    acessibility: require("../../../assets/acessibility.png"),
    rain: require("../../../assets/rain.png"),
    people: require("../../../assets/people.png"),
  };

  const handleButtonPress = (buttonId: number) => {
    setIsActive(buttonId);
  };

  const getImagePath = (imageName: string) => imagePaths[imageName];

  const renderButton = (buttonId: number, image: string, label: string) => (
    <TouchableOpacity
      key={buttonId}
      style={styles.optionContent}
      onPress={() => handleButtonPress(buttonId)}
    >
      <Image
        source={getImagePath(image)}
        style={[styles.icon, isActive === buttonId && styles.activeButton]}
      />
      <Text style={styles.optionDescription}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Quero um caminho</Text>
      <View style={styles.optionsContainer}>
        {renderButton(1, "acessibility", "Acessível")}
        {renderButton(2, "rain", "Sem chuva")}
        {renderButton(3, "people", "Sem multidões")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 200,
    padding: 16,

    backgroundColor: "#453f51",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,

    position: "absolute",
    bottom: 0,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  activeButton: {
    borderWidth: 5,
    borderColor: "black",
  },
  optionContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
  },
  optionDescription: {
    color: "white",
    fontSize: 14,

    marginTop: 8,
  },
});

export default Bottomsheet;
