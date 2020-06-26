import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { colors, screen } from 'app/config/constants'

type Props = {
  handleChange: (color: string) => void
  currentColour: string
}

function ColorPicker({ handleChange, currentColour }: Props) {
  const c = [colors.YELLOW, colors.RED, colors.GREEN, colors.BLUE]
  const x = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(x.value) }],
    }
  })

  useEffect(() => {
    x.value = (c.indexOf(currentColour) || 0) * (screen.WIDTH / 4)
  }, [currentColour])

  return (
    <View style={styles.container}>
      {c.map((color, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => handleChange(color)}>
            <View
              style={{
                height: screen.HEIGHT / 15,
                width: screen.WIDTH / 4,
                backgroundColor: color,
              }}
            />
          </TouchableOpacity>
        )
      })}
      <Animated.View style={[styles.selector, style]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screen.WIDTH,
    transform: [{ rotate: '-2deg' }],
  },
  selector: {
    position: 'absolute',
    borderColor: colors.WHITE,
    borderWidth: 10,
    width: screen.WIDTH / 4 + 4,
    height: screen.HEIGHT / 15,
  },
})

export default ColorPicker
