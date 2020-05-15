import React from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { colors, fonts } from 'app/config/constants'

type Props = {
  title: string
  backgroundColor: string
  style?: StyleProp<ViewStyle>
  uppercased?: boolean
  left?: boolean
  big?: boolean
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: fonts.BOLD,
  },
})

function Type({
  style,
  title,
  backgroundColor = '#fff',
  uppercased = false,
  left = false,
  big = false,
}: Props) {
  const text = uppercased ? title.toUpperCase() : title
  const rotation = `${left ? '-' : ''}2deg`

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.background,
          { backgroundColor, transform: [{ rotate: rotation }] },
        ]}
      />
      <Text style={[styles.text, { fontSize: big ? 90 : 80 }]}>{text}</Text>
    </View>
  )
}
export default Type
