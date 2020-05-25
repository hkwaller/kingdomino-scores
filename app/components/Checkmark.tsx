import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import { colors } from 'app/config/constants'

type Props = {
  checked: boolean
}

function CheckMark({ checked }: Props) {
  return (
    <View style={{ width: 60, height: 60 }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          padding: 20,
          backgroundColor: colors.WHITE,
        }}
      />
      {checked && (
        <Svg height="50" width="80">
          <Path
            d="M10 30 L25 45 L55 5"
            fill="none"
            stroke={colors.BLACK}
            strokeWidth={8}
          />
        </Svg>
      )}
    </View>
  )
}

export default CheckMark
