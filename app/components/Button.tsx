import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fonts } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  destination?: string
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

function Button({
  title,
  lean = 'right',
  backgroundColor,
  destination,
}: Props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate(destination)}>
      <View style={styles.container}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
            transform: [{ rotate: `${lean === 'left' ? '-' : ''}2deg` }],
          }}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default Button
