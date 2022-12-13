import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import Rotation from "./components/Rotation";
import Compass from "./components/Compass";
import Position from "./components/Position";
import Accel from "./components/Accel";

export default function App() {
  const [showRotation, setShowRotation] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kan Det GÅÅÅ</Text>
      <Text style={styles.head}>EINAR</Text>
      <View style={styles.flexView}>
        <TouchableOpacity
          onPress={() => setShowRotation(0)}
          style={showRotation === 0 ? styles.buttosSelected : styles.button}
        >
          <Text>Rotation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowRotation(1)}
          style={showRotation === 1 ? styles.buttosSelected : styles.button}
        >
          <Text>Position</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowRotation(2)}
          style={showRotation === 2 ? styles.buttosSelected : styles.button}
        >
          <Text>Rotation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowRotation(3)}
          style={showRotation === 3 ? styles.buttosSelected : styles.button}
        >
          <Text>Accel</Text>
        </TouchableOpacity>
      </View>

      <View>
        {showRotation === 0 && <Compass />}
        {showRotation === 1 && <Position />}
        {showRotation === 2 && <Rotation />}
        {showRotation === 3 && <Accel />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  head: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#BBB",
    padding: 10,
    margin: 10,
  },

  buttosSelected: {
    alignItems: "center",
    backgroundColor: "#EaEaEa",
    padding: 10,
    margin: 10,
  },

  flexView: {
    flexDirection: "row",
  },

  heading: {
    fontSize: 45,
    position: "absolute",
    top: 50,
  },
});
