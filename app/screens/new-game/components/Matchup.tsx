import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { view } from '@risingstack/react-easy-state'

import { state } from 'app/config/data'
import { colors, fonts } from 'app/config/constants'

type Props = {
  players: number[]
  onPress: () => void
}

function Matchup({ players, onPress }: Props) {
  const [height, setHeight] = useState(50)

  return (
    <TouchableOpacity
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => setHeight(height)}
      onPress={onPress}
      style={[styles.container, { height: height }]}
    >
      {players.map((p, index) => {
        const { name, color } = state.players.filter(
          player => player.id === p
        )[0]

        return (
          <View
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View style={[styles.playerBackground, { backgroundColor: color }]}>
              <Text style={[styles.text]}>{name}</Text>
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
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 50,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 24,
    paddingHorizontal: 20,
  },
  vs: {
    fontFamily: fonts.BOLD,
    fontSize: 20,
    paddingHorizontal: 20,
  },
})
export default view(Matchup)
