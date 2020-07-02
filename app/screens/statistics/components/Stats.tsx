import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { screen, colors } from "app/config/constants";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  delay
} from "react-native-reanimated";

type Props = {
  stat: Stat;
};

type Stat = {
  wins: number;
  losses: number;
  draws: number;
  playedGames: number;
};

function Stats({ stat }: Props) {
  const wins = useSharedValue(0);
  const losses = useSharedValue(0);
  const draws = useSharedValue(0);

  const factor = (screen.WIDTH - 40) / stat.playedGames;

  useEffect(() => {
    wins.value = factor * stat.wins;
    draws.value = factor * stat.draws;
    losses.value = factor * stat.losses;
  }, []);

  const winStyle = getAnimatedStyle(wins.value);

  const drawStyle = getAnimatedStyle(draws.value);

  const lossStyle = getAnimatedStyle(losses.value);

  return (
    <View style={styles.stats}>
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: colors.GREEN
          },
          winStyle
        ]}
      />
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: colors.GREY
          },
          drawStyle
        ]}
      />
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: "tomato"
          },
          lossStyle
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: screen.WIDTH - 40
  }
});

function getAnimatedStyle(v) {
  return useAnimatedStyle(() => {
    return {
      width: delay(400, withSpring(v.value, { damping: 16 }))
    };
  });
}

export default Stats;
