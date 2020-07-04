import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  delay,
} from 'react-native-reanimated'
import { screen } from 'app/config/constants'
import SmallText from 'app/components/SmallText'

type Props = {
  show: boolean
}

function Intro({ show }: Props) {
  const animation = useSharedValue(screen.WIDTH)

  useEffect(() => {
    if (show) animation.value = 0
    else animation.value = -screen.WIDTH
  }, [show])

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: delay(100, withSpring(animation.value, { damping: 15 })),
        },
      ],
    }
  })
  return (
    <Animated.View style={[{ marginTop: 40 }, style]}>
      <SmallText>Enter the total score you got for this type</SmallText>
    </Animated.View>
  )
}
export default Intro
