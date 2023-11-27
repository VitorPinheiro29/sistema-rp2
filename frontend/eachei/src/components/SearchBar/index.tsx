import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import UniversityLogo from "../UniversityLogo";

interface SearchBarProps {
  placeholder: string;
  origin?: string;
  destiny?: string;
  onChange: (placeholder: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, origin, destiny, onChange}) => {
  const showMargin = true;
  const textInputRef = useRef<TextInput>(null);
  const originOrDestiny = destiny == undefined ? origin : destiny
  let placeHolderVariable = originOrDestiny == "" ? placeholder : originOrDestiny

  const handleSearchBar = (placeholder: string) => {
    onChange(placeholder)
  }
  
  useEffect(() => {
    setTimeout(() => {
      if (textInputRef.current && placeHolderVariable == "Informe sua origem") {
        handleSearchBar(placeholder)
        textInputRef.current.focus();
      }
    }, 100);
  }, [textInputRef, origin, destiny]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : undefined}
      style={{ flex: 1 }}
    >
      <View style={[styles.searchBarContainer, showMargin && styles.containerWithMargin]}>
        <TouchableOpacity onPress={() => handleSearchBar(placeholder)}>
          <View style={styles.button}>
            <UniversityLogo />
            <TextInput
              ref={textInputRef}
              placeholder={placeHolderVariable}
              placeholderTextColor="white"
              style={styles.buttonText}
              onPressIn={() => handleSearchBar(placeholder)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    display: "flex",
    paddingHorizontal: 16,
    width: "100%",
  },
  containerWithMargin: {
    paddingTop: 16
  },
  button: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderColor: "#ffffff",
    borderWidth: 0.5,
    color: "#ffffff",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    paddingLeft: 10,
    color: "white",
    flex: 1,
  },
});

export default SearchBar;
