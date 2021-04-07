import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { colors } from 'app/config/constants'
import { Button } from 'app/components'

type Props = {
  selectedPlayersIsOver: boolean
  onPress: () => void
}

function ContinueButton({ selectedPlayersIsOver, onPress }: Props) {
  const y = useSharedValue(200)

  useEffect(() => {
    if (selectedPlayersIsOver) {
      y.value = 0
    } else {
      y.value = 200
    }
  }, [selectedPlayersIsOver])

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(y.value) }],
    }
  })

  return (
    <Animated.View
      style={[
        {
          zIndex: 100,
          backgroundColor: colors.BACKGROUND,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 20,
        },
        style,
      ]}
    >
      <Button
        title="Start game"
        backgroundColor={colors.YELLOW}
        lean="right"
        onPress={onPress}
      />
    </Animated.View>
  )
}

export default ContinueButton
