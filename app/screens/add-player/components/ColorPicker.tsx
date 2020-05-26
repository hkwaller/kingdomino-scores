import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { colors } from 'app/config/constants'

type Props = {
  handleChange: (color) => void
  currentColour: string
}

const WIDTH = Dimensions.get('screen').width

function ColorPicker({ handleChange, currentColour }: Props) {
  const c = [colors.YELLOW, colors.RED, colors.GREEN, colors.BLUE]

  return (
    <View style={styles.container}>
      {c.map((color, index) => {
        const selected = currentColour === c[index]

        return (
          <TouchableOpacity
            style={{ flex: 1 }}
            key={index}
            onPress={() => handleChange(color)}>
            <View
              style={{
                flex: 1,
                backgroundColor: color,
                paddingVertical: WIDTH / 15,
                borderWidth: 10,
                borderColor: selected ? colors.WHITE : color,
              }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: WIDTH,
    transform: [{ rotate: '-2deg' }],
  },
})

export default ColorPicker
