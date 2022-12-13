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
      setLocation([location.coords.longitude, location.coords.latitude]);
    })();
  }, []);

  const getNewLocation = (location, degree, distance) => {
    lat2 = location[1] + (distance / earth_radius) * (180 / pi) * cos(degree);
    lon2 =
      location[0] +
      ((distance / earth_radius) * (180 / pi) * sin(degree)) / cos(location[1]);
    return [lon2, lat2];
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (magHead) {
    text = Math.round(magHead) + "º\n" + location;
  }

  return (
    <View>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

/* @hide const styles = StyleSheet.create({ ... }); */
const styles = StyleSheet.create({
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
