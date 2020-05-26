import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import Animated, { interpolate } from 'react-native-reanimated'
import { useSpringTransition } from 'react-native-redash'
import { colors } from 'app/config/constants'

type Props = {
  checked: boolean
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

function CheckMark({ checked }: Props) {
  const animation = useSpringTransition(checked, { damping: 10 })

  const scale = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, 1.2],
  })

  return (
    <View style={{ width: 60, height: 60 }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          padding: 20,
          backgroundColor: colors.WHITE,
        }}
      />
      <AnimatedSvg height="50" width="80" style={{ transform: [{ scale }] }}>
        <Path
          d="M10 30 L25 45 L55 5"
          fill="none"
          stroke={colors.BLACK}
          strokeWidth={8}
        />
      </AnimatedSvg>
    </View>
  )
}

export default CheckMark
