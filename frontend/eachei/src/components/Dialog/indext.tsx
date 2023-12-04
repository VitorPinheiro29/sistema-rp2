import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert } from "react-native";

interface Dialog {
  type: string;
  message: string;
}

const Dialog: React.FC<Dialog> = ({ type, message }) => {

  const navigation = useNavigation();

  const handleAlertButton = () => {
    navigation.navigate("Search" as never);
  };

  const showAlert = (type: string, message: string) => {
    let title = "";
    let buttonText = "";

    if (type == "error") {
      title = "Rota não encontrada";
      buttonText = "Pesquisar nova rota";
    }
    Alert.alert(
      `${title}`,
      `${message}`,
      [
        {
          text: `${buttonText}`,
          onPress: () => handleAlertButton(),
          style: "cancel",
        },
      ],
      {
        cancelable: true
      }
    );
  };

  useEffect(() => {
      console.log("Pereira");
    showAlert(type, message);
  }, [message]);

  return null;
};

export default Dialog;
