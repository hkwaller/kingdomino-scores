import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Svg, Line } from 'react-native-svg'
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
          <Line
            x1="8.5"
            y1="25.5"
            x2="29.5"
            y2="46.5"
            id="Line-3"
            stroke="#2B2B2C"
            strokeWidth="11"
          />
          <Line
            x1="29.5"
            y1="46.5"
            x2="74.5"
            y2="8.5"
            id="Line"
            stroke="#2B2B2C"
            strokeWidth="11"
          />
        </Svg>
      )}
    </View>
  )
}

export default CheckMark
