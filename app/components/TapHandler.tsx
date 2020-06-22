import React, { ReactNode } from 'react'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'

export default ({ onPress, children, value }) => {
  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View>{children}</Animated.View>
    </TapGestureHandler>
  )
}
