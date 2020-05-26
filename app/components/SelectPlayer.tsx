import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { colorArray, fonts } from 'app/config/constants'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import { useSpringTransition, useTimingTransition } from 'react-native-redash'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: (player) => void
}

function SelectPlayer({ player, isSelected, selectPlayer }: Props) {
  const animation = useTimingTransition(isSelected)

  const bgColour = colorArray[player.colour]

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
            backgroundColor: bgColour,
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
