import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { colors } from 'app/config/constants'

type Props = {
  handleChange: (color) => void
}

const WIDTH = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: WIDTH,
    transform: [{ rotate: '-2deg' }],
  },
})

function ColorPicker({ handleChange }: Props) {
  const c = [colors.YELLOW, colors.RED, colors.GREEN, colors.BLUE]
  const [selectedColor, setSelectedColor] = useState(0)

  useEffect(() => {
    handleChange(selectedColor)
  }, [selectedColor])

  return (
    <View style={styles.container}>
      {c.map((color, index) => {
        const selected = selectedColor === index

        return (
          <TouchableOpacity
            style={{ flex: 1 }}
            key={index}
            onPress={() => {
              setSelectedColor(index)
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: color,
                paddingVertical: WIDTH / 15,
                borderWidth: selected ? 10 : 0,
                borderColor: selected ? colors.WHITE : 'transparent',
              }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default ColorPicker
