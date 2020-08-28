import React from 'react'
import { SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { view } from '@risingstack/react-easy-state'

import Purchase from 'app/components/Purchase'
import { Header } from 'app/components'
import CheckMark from '../new-game/components/Checkmark'
import { fonts, screen } from 'app/config/constants'
import { state } from 'app/config/data'

function Settings() {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Header title="Settings" />
      <TouchableOpacity
        onPress={() => (state.showConfetti = !state.showConfetti)}
        style={styles.button}
      >
        <CheckMark checked={state.showConfetti} />
        <Text style={styles.buttonText}>Show confetti when game finishes</Text>
      </TouchableOpacity>
      <Purchase />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
    paddingHorizontal: screen.WIDTH / 4,
  },
  buttonText: {
    marginLeft: 20,
    fontFamily: fonts.BOLD,
    fontSize: 24,
  },
})

export default view(Settings)
