import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { fonts } from 'app/config/constants'

type Props = {
  title: string
  style?: StyleProp<ViewStyle>
}

function SmallHeader({ title, style }: Props) {
  return (
    <Text style={[{ fontFamily: fonts.BOLD, fontSize: 40 }, style]}>
      {title}
    </Text>
  )
}

export default SmallHeader
