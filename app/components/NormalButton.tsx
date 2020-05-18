import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native'
import { fonts } from 'app/config/constants'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

function NormalButton({
  title,
  backgroundColor,
  lean = 'right',
  onPress,
  style,
}: Props) {
  const rotation = `${lean === 'right' ? '-' : ''}2deg`

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor,
          transform: [{ rotate: rotation }],
        }}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignSelf: 'center',
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 80,
    marginBottom: -10,
  },
})

export default NormalButton
