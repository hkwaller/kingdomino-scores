import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native'
import Purchase from 'app/components/Purchase'
import { Header } from 'app/components'
import CheckMark from '../new-game/components/Checkmark'
import { fonts } from 'app/config/constants'
import { state } from 'app/config/data'
import { view } from '@risingstack/react-easy-state'

function Settings() {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Header title="Settings" />
      <TouchableOpacity
        onPress={() => (state.showConfetti = !state.showConfetti)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 40,
        }}
      >
        <CheckMark checked={state.showConfetti} />
        <Text style={{ marginLeft: 20, fontFamily: fonts.BOLD, fontSize: 24 }}>
          Show confetti
        </Text>
      </TouchableOpacity>
      <Purchase />
    </SafeAreaView>
  )
}
export default view(Settings)
