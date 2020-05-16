import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { Checkmark } from '.'
import { fonts } from 'app/config/constants'

type Props = {
  item: any
  handleCheck: (event: TapGestureHandlerGestureEvent) => void
  type: 'king' | 'symmetric'
}

const texts = {
  symmetric: 'Symmetric',
  king: 'King in the middle',
}

function Check({ item, handleCheck, type }: Props) {
  return (
    <TapGestureHandler onHandlerStateChange={event => handleCheck(event)}>
      <View style={[styles.checkmark, { marginTop: type === 'king' ? 30 : 0 }]}>
        <Checkmark checked={item[type]} />
        <Text style={styles.checkmarkText}>{texts[type]}</Text>
      </View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('screen').width - 100,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  checkmark: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkmarkText: {
    fontFamily: fonts.LIGHT,
    fontSize: 20,
    marginLeft: 25,
    width: 150,
  },
})

export default Check
