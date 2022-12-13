import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";

export default function Rotation() {
  const [{ rotation, rotationRate }, setMotionData] = useState({
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
    rotationRate: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  });

  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    DeviceMotion.setUpdateInterval(1000);
  };
  const _fast = () => {
    DeviceMotion.setUpdateInterval(16);
  };

  const _getLocalDegrees = (alpha) => {
    const localDegrees = alpha * 180;
    return localDegrees;
  };

  const _subscribe = () => {
    setSubscription(
      DeviceMotion.addListener((data) => {
        setMotionData(data);
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

      <Text style={styles.text}>Rotation:</Text>
      <Text style={styles.text}>
        alpha: {(rotation.alpha / Math.PI) * 180} | {rotationRate.alpha}
      </Text>
      <Text style={styles.text}>
        beta: {(rotation.beta / Math.PI) * 180} | {rotationRate.beta}
      </Text>
      <Text style={styles.text}>
        gamma: {(rotation.gamma / Math.PI) * 180} | {rotationRate.gamma}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
});
