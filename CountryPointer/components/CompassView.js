import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Platform,
  Text,
  View,
  StyleSheet,
} from "react-native";
/* @hide */
import Device from "expo-device";
/* @end */
import * as Location from "expo-location";
import { DeviceMotion } from "expo-sensors";

export default function CompassView() {
  const [magHead, setCoordinates] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [location, setLocation] = useState([0, 0]);

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    DeviceMotion.setUpdateInterval(32);
  };

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(async (data) => {
        let location = await Location.getHeadingAsync({});
        setCoordinates(location.magHeading);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    _fast();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      /* @hide */
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation([location.coords.latitude, location.coords.longitude]);
    })();
  }, []);
  const [newLocation, setNewLocation] = useState([0, 0]);

  const getNewLocation = (location, degree, distance) => {
    const earth_radius = 6371 * 1000;
    degree = (degree * Math.PI) / 180;
    const lat2 =
      location[0] +
      (distance / earth_radius) * (180 / Math.PI) * Math.cos(degree);
    const lon2 =
      location[1] +
      (distance / earth_radius) * (180 / Math.PI) * Math.sin(degree);
    console.log(lat2 + "," + lon2);
    return [lat2, lon2];
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (magHead) {
    text = Math.round(magHead) + "º\n" + location[0] + "\n" + location[1];
  }

  return (
    <View>
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity
        onPress={() =>
          setNewLocation(getNewLocation(location, magHead, 100_000))
        }
        style={styles.darkModeButton}
      >
        <Text>Cpº</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        {newLocation[0] + "\n" + newLocation[1]}
      </Text>
    </View>
  );
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
  darkModeButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 30,
    textAlign: "center",
    color: "blue",
  },
  errorMsg: {
    color: "red",
  },
});
