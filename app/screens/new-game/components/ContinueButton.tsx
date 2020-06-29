import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { screen, colors } from 'app/config/constants'
import { Button } from 'app/components'

type Props = {
  selectedPlayersIsOver: boolean
  onPress: () => void
}

function ContinueButton({ selectedPlayersIsOver, onPress }: Props) {
  const y = useSharedValue(100)

  useEffect(() => {
    if (selectedPlayersIsOver) {
      y.value = -100
    } else {
      y.value = 100
    }
  }, [selectedPlayersIsOver])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(y.value) }],
    }
  })

  return (
    <Animated.View
      style={[{ position: 'absolute', bottom: -340, left: 0, right: 0 }, style]}
    >
      <Button
        title="New Game"
        backgroundColor={colors.YELLOW}
        lean="right"
        small
        onPress={onPress}
      />
    </Animated.View>
  )
}

export default ContinueButton
