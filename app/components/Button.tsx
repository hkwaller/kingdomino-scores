import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Animated, { Value, interpolate } from 'react-native-reanimated'
import { fonts } from 'app/config/constants'
import TapHandler from './TapHandler'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  small?: boolean
}

function Button({
  title,
  lean = 'right',
  backgroundColor,
  onPress,
  style,
  small = false,
}: Props) {
  const value = new Value(0)
  const scale = interpolate(value, {
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  })

  const outputRange = lean === 'right' ? [-0.05, 0.05] : [0.05, -0.05]
  const rotate = interpolate(value, {
    inputRange: [0, 1],
    outputRange: outputRange,
  })

  return (
    <TapHandler onPress={onPress} value={value}>
      <View style={[styles.container, style]}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
            transform: [{ rotate }],
          }}
        />
        <Animated.Text
          style={[
            styles.text,
            { fontSize: small ? 60 : 80, transform: [{ scale }] },
          ]}>
          {title}
        </Animated.Text>
      </View>
    </TapHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.BOLD,
    marginBottom: -10,
  },
})

export default Button
