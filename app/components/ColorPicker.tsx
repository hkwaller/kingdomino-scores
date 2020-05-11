import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { colors } from 'app/config/constants'

type Props = {}

const WIDTH = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: WIDTH,
    transform: [{ rotate: '-2deg' }],
  },
})

function ColorPicker(props: Props) {
  const [selectedColor, setSelectedColor] = useState(0)
  const c = [colors.YELLOW, colors.RED, colors.GREEN, colors.BLUE]

  return (
    <View style={styles.container}>
      {c.map((color, index) => {
        const selected = selectedColor === index

        return (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSelectedColor(index)}>
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
