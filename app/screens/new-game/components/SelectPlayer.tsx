import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import { useTimingTransition } from 'react-native-redash'
import { fonts } from 'app/config/constants'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: (player) => void
}

function SelectPlayer({ player, isSelected, selectPlayer }: Props) {
  const animation = useTimingTransition(isSelected)

  const textScale = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  })

  const translateX = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <TouchableWithoutFeedback onPress={() => selectPlayer(player)}>
      <Animated.View key={player.name} style={styles.playerContainer}>
        <Animated.Text
          style={[styles.playerText, { transform: [{ scale: textScale }] }]}>
          {player.name}
        </Animated.Text>
        <Animated.View
          style={{
            backgroundColor: player.colour,
            height: 50,
            width: 50,
            transform: [{ scale: animation, translateX }],
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
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
