import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colorArray, fonts } from 'app/config/constants'
import Animated, { interpolate } from 'react-native-reanimated'
import {
  withTimingTransition,
  useTimingTransition,
  useSpringTransition,
} from 'react-native-redash'
import { useMemoOne } from 'use-memo-one'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: (player) => void
}

function SelectPlayer({ player, isSelected, selectPlayer }: Props) {
  const bgColour = isSelected ? colorArray[player.colour] : 'transparent'

  const animation = useSpringTransition(isSelected)

  const scale = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <TouchableOpacity
      key={player.name}
      onPress={() => selectPlayer(player)}
      style={[styles.playerContainer]}>
      <Text style={styles.playerText}>{player.name}</Text>
      <Animated.View
        style={{
          backgroundColor: bgColour,
          height: 50,
          width: 50,
          transform: [{ scale }],
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerText: {
    fontFamily: fonts.LIGHT,
    fontSize: 24,
  },
})

export default SelectPlayer
