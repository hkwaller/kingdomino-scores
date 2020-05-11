import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts } from '../config/constants'

type Props = {
  lean: 'left' | 'right'
  title: string
  backgroundColor: string
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 80,
    marginBottom: -10,
  },
})

function Button({ title, lean, backgroundColor }: Props) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
            transform: [{ rotate: `${lean === 'right' ? '-' : ''}2deg` }],
          }}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default Button
