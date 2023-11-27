import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View
} from "react-native";

import Routes from './src/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263c3f"
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Routes />
    </View>
  );
}
