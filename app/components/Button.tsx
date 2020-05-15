import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { fonts } from 'app/config/constants'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

function Button({
  title,
  lean = 'right',
  backgroundColor,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
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

export default Button
