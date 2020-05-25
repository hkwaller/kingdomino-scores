import React from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { colors, fonts, landscapeFontColors } from 'app/config/constants'

type Props = {
  title: string
  style?: StyleProp<ViewStyle>
  landscape?: boolean
  left?: boolean
  backgroundColor: string
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
  landscape = false,
  left = false,
  backgroundColor,
}: Props) {
  const text = landscape ? title.toUpperCase() : title
  const rotation = `${left ? '-' : ''}2deg`
  const landscapeStyle = landscape
    ? { borderWidth: 8, borderColor: colors.WHITE, marginHorizontal: -30 }
    : {}

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.background,
          {
            backgroundColor,
            transform: [{ rotate: rotation }],
          },
          landscapeStyle,
        ]}
      />
      <Text
        style={[
          styles.text,
          {
            fontSize: landscape ? 90 : 80,
            color: landscape
              ? landscapeFontColors[title.toUpperCase()]
              : colors.BLACK,
          },
        ]}>
        {text}
      </Text>
    </View>
  )
}
export default Type
