import React from "react";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Button } from "../../components/Button";
import { Container } from "./styles";
import { Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(0.73, 0.17, 0, 1.01),
          }),
        },
      ],
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <Container>
      <Animated.View style={animatedStyles}></Animated.View>
      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  );
}
