import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { colors } from 'app/config/constants'

type Props = {
  handleChange: (color) => void
  currentColour: string
}

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

function ColorPicker({ handleChange, currentColour }: Props) {
  const c = [colors.YELLOW, colors.RED, colors.GREEN, colors.BLUE]
  const x = useSharedValue(-100)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(x.value) }],
    }
  })

  useEffect(() => {
    x.value = (c.indexOf(currentColour) || 0) * 100
  }, [currentColour])

  return (
    <View style={styles.container}>
      {c.map((color, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => handleChange(color)}>
            <View
              style={{
                height: HEIGHT / 15,
                width: WIDTH / 4,
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
    width: WIDTH,
    transform: [{ rotate: '-2deg' }],
  },
  selector: {
    position: 'absolute',
    borderColor: colors.WHITE,
    borderWidth: 10,
    width: WIDTH / 4 + 4,
    height: HEIGHT / 15,
  },
})

export default ColorPicker
