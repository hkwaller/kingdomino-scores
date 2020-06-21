import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated'
import {
  useTimingTransition,
  transformOrigin,
  useSpringTransition,
} from 'react-native-redash'
import { fonts } from 'app/config/constants'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: (player) => void
}

function SelectPlayer({ player, isSelected, selectPlayer }: Props) {
  const animation = useSpringTransition(isSelected)

  const textScale = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [1, 1.4],
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
          style={[
            styles.playerText,
            {
              transform: transformOrigin(
                { x: -25, y: 0 },
                { scale: textScale },
              ),
            },
          ]}>
          {player.name}
        </Animated.Text>
        <Animated.View
          style={{
            backgroundColor: player.colour,
            height: 50,
            width: 100,
            transform: transformOrigin(
              { x: 1, y: 0 },
              { scale: animation, translateX },
            ),
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
