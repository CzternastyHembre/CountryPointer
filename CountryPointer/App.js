import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import Rotation from "./components/Rotation";
import Compass from "./components/Compass";
import Position from "./components/Position";
import Accel from "./components/Accel";
import CompassComplete from "./components/CompassComplete";
import CompassView from "./components/CompassView";

export default function App() {
  const [showRotation, setShowRotation] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CountryPointerº</Text>
      <Text style={styles.head}>EINAR</Text>
      <View style={styles.arrowUp}></View>
      <View>
        <CompassView />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowUp: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  head: {
    fontSize: 20,
    position: "absolute",
    top: 100,
  },
  text: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#BBB",
    padding: 10,
  },

  buttosSelected: {
    alignItems: "center",
    backgroundColor: "#EaEaEa",
    padding: 10,
  },

  flexView: {
    marginTop: 150,
    flexDirection: "row",
  },

  heading: {
    fontSize: 45,
    position: "absolute",
    top: 50,
  },
});
