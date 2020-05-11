import React from 'react'
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { colors, fonts } from 'app/config/constants'

type Props = {
  placeholder?: string
  type?: 'numeric' | 'default'
  style?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.WHITE,
    transform: [{ rotate: '2deg' }],
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: fonts.BOLD,
  },
})

function Input({ placeholder, type = 'default', style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.background} />
      <TextInput
        style={styles.text}
        keyboardType={type}
        placeholder={placeholder}>
        {''}
      </TextInput>
    </View>
  )
}
export default Input
