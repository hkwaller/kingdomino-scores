import React from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { fonts } from 'app/config/constants'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  onPress: () => void
  style?: StyleProp<ViewStyle>
  small?: boolean
}

function Button({
  title,
  lean = 'right',
  backgroundColor,
  onPress,
  small = false,
}: Props) {
  const startValue = lean === 'right' ? 0.05 : -0.05
  const endValue = lean === 'right' ? -0.05 : 0.05

  const scaleValue = useSharedValue(1)
  const rotationValue = useSharedValue(startValue)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: _ => {
      scaleValue.value = 1.2
      rotationValue.value = endValue
    },
    onFail: _ => {
      scaleValue.value = 1
      rotationValue.value = startValue
    },
    onEnd: _ => {
      scaleValue.value = 1
      rotationValue.value = endValue
    },
  })

  const rotation = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: withSpring(rotationValue.value) }],
    }
  })

  const scale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scaleValue.value) }],
    }
  })

  return (
    <TapGestureHandler
      onHandlerStateChange={event => {
        onGestureEvent
        if (event.nativeEvent.state === State.END) onPress()
      }}
      onGestureEvent={onGestureEvent}
      maxDist={15}
    >
      <Animated.View style={[styles.container]}>
        <Animated.View
          style={[
            {
              backgroundColor: backgroundColor,
              ...StyleSheet.absoluteFillObject,
            },
            rotation,
          ]}
        />
        <Animated.Text
          style={[styles.text, { fontSize: small ? 45 : 65 }, scale]}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.BOLD,
    marginBottom: -10,
  },
})

export default Button
