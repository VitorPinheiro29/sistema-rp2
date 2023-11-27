import React from "react";
import { StyleSheet, Image } from "react-native";

const UniversityLogo = () => {
  return (
    <>
      <Image
        source={require("../../../assets/logo_each.png")}
        style={styles.icon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default UniversityLogo;
