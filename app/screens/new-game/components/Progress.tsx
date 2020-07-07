import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { landscapeColors, screen, colors } from 'app/config/constants'

type Props = {
  progress: number
}

const ITEM_WIDTH = screen.WIDTH / 6

function Progress({ progress }: Props) {
  const x = useSharedValue(0)

  useEffect(() => {
    x.value = progress
  }, [progress])

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(x.value * ITEM_WIDTH, {
            duration: 400,
            easing: Easing.bezier(0.86, 0.0, 0.07, 1.0),
          }),
        },
      ],
    }
  })

  return (
    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
      {Object.keys(landscapeColors).map((l, index) => {
        return (
          <View
            key={index}
            style={{ flex: 1, backgroundColor: landscapeColors[l], height: 20 }}
          ></View>
        )
      })}
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.BACKGROUND,
            height: 20,
            width: screen.WIDTH,
          },
          style,
        ]}
      />
    </View>
  )
}
export default Progress
