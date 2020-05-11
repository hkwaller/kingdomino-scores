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
import { useNavigation } from '@react-navigation/core'

type Props = {
  title: string
  backgroundColor: string
  lean?: 'left' | 'right'
  destination?: string
  style?: StyleProp<ViewStyle>
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
  style,
}: Props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate(destination)}>
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
export default Button
