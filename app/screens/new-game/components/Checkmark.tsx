import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { colors } from 'app/config/constants'

type Props = {
  checked: boolean
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

function CheckMark({ checked }: Props) {
  const scale = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    }
  })

  useEffect(() => {
    if (checked) {
      scale.value = 1.2
    } else {
      scale.value = 0
    }
  }, [checked])

  return (
    <View style={{ width: 60, height: 60 }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          padding: 20,
          backgroundColor: colors.WHITE,
        }}
      />
      <AnimatedSvg height="50" width="80" style={style}>
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
