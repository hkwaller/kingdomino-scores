import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { screen, colors } from 'app/config/constants'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  delay,
} from 'react-native-reanimated'

type Props = {
  stat: Stat
}

type Stat = {
  wins: number
  losses: number
  draws: number
}

function Stats({ stat }: Props) {
  const wins = useSharedValue(0)
  const losses = useSharedValue(0)
  const draws = useSharedValue(0)

  useEffect(() => {
    wins.value = stat.wins
    draws.value = stat.draws
    losses.value = stat.losses
  }, [])

  const winStyle = useAnimatedStyle(() => {
    return {
      flex: delay(400, withSpring(wins.value)),
    }
  })

  const drawStyle = useAnimatedStyle(() => {
    return {
      flex: delay(400, withSpring(draws.value)),
    }
  })

  const lossStyle = useAnimatedStyle(() => {
    return {
      flex: delay(400, withSpring(losses.value)),
    }
  })

  return (
    <View style={styles.stats}>
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: colors.GREEN,
          },
          winStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: colors.GREY,
          },
          drawStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            height: 5,
            backgroundColor: 'tomato',
          },
          lossStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  stats: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: screen.WIDTH - 40,
  },
})

export default Stats
