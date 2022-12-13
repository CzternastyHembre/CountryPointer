import { StatusBar } from "expo-status-bar";
import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
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
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "black" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.container}>
          <Text style={styles.heading}>CountryPointerº</Text>
          <View style={styles.arrowUp}></View>
          <View>
            <CompassView />
          </View>
          <Text style={styles.head}>Einar BH Penis & Mattis CH</Text>
        </View>
      </SafeAreaView>
    </Fragment>
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  head: {
    fontSize: 20,
    position: "absolute",
    bottom: 110,
    color: "#fff",
    fontFamily: "Cochin",
    fontWeigth: 10,
    fontStyle: "cursive",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },

  flexView: {
    marginTop: 150,
    flexDirection: "row",
    color: "#fff",
  },

  heading: {
    fontSize: 45,
    position: "absolute",
    top: 50,
    color: "#fff",
  },
});
