import React from "react";

import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Button } from "../../components/Button";
import { Container } from "./styles";

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
      return {
          transform: [{ translateX: animation.value }]
      }
  });

  return (
    <Container>
      <Animated.View style={animatedStyles}></Animated.View>
      <Button title="Mover" onPress={() => {}} />
    </Container>
  );
}
