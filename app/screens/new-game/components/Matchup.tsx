import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { view } from '@risingstack/react-easy-state'
import { state } from 'app/config/data'
import { colors, fonts } from 'app/config/constants'

type Props = {
  players: number[]
  onPress: () => void
  isSelected: boolean
}

function Matchup({ players, onPress, isSelected }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {players.map((p, index) => {
        return (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={[
                styles.playerBackground,
                { backgroundColor: state.players[p].color },
              ]}
            >
              <Text style={[styles.text]}>{state.players[p].name}</Text>
            </View>
            {index < players.length - 1 && <Text style={styles.vs}>vs.</Text>}
          </View>
        )
      })}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    marginRight: 20,
    borderRadius: 50,
    marginVertical: 10,
  },
  playerBackground: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
    paddingHorizontal: 20,
  },
  vs: {
    fontFamily: fonts.BOLD,
    fontSize: 20,
    paddingHorizontal: 20,
  },
})
export default view(Matchup)
