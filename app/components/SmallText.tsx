import React from 'react'
import { Text } from 'react-native'
import { fonts } from 'app/config/constants'

type Props = {
  children: string
}

function SmallText({ children }: Props) {
  return (
    <Text style={{ fontFamily: fonts.BOLD, fontSize: 20 }}>{children}</Text>
  )
}
export default SmallText
