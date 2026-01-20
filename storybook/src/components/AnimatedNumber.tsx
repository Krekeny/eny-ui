import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import {
  useSharedValue,
  withTiming,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";

export type AnimatedNumberProps = {
  value: number;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  formatter?: (value: number) => string;
};

export default function AnimatedNumber({
  value,
  color = "#000",
  fontSize = 14,
  fontWeight = "normal",
  formatter = (val) => val.toString(),
}: AnimatedNumberProps) {
  const animatedValue = useSharedValue(value);
  const [displayValue, setDisplayValue] = useState(formatter(value));

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration: 300 });
  }, [value, animatedValue]);

  useAnimatedReaction(
    () => animatedValue.value,
    (currentValue) => {
      const formatted = formatter(Math.round(currentValue));
      runOnJS(setDisplayValue)(formatted);
    }
  );

  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontSize,
          fontWeight,
        },
      ]}
    >
      {displayValue}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

