import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors, fonts } from 'app/config/constants'

type Props = {
  placeholder?: string
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

function Input({ placeholder }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <TextInput style={styles.text}>{placeholder || 0}</TextInput>
    </View>
  )
}
export default Input
