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

export default function CompassComplete() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener(async (data) => {
        let location = await Location.getHeadingAsync({});
        setLocation(location);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
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

      let location = await Location.getHeadingAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location.magHeading;
  }

  return (
    <View>
      <Text style={styles.head}>EINAR</Text>
      <TouchableOpacity
        onPress={subscription ? _unsubscribe : _subscribe}
        style={styles.button}
      >
        <Text stye={styles.header}>{subscription ? "On" : "Off"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_slow}
        style={[styles.button, styles.middleButton]}
      >
        <Text>Slow</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_fast} style={styles.button}>
        <Text>Fast</Text>
      </TouchableOpacity>

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
    fontSize: 18,
    textAlign: "center",
  },
});
