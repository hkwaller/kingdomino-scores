import React, { useEffect } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { fonts } from 'app/config/constants'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: (player: any) => void
}

function SelectPlayer({ player, isSelected, selectPlayer }: Props) {
  const textScale = useSharedValue(1)
  const translateX = useSharedValue(100)

  const textStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(textScale.value) }],
    }
  })

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value) }],
    }
  })

  useEffect(() => {
    if (isSelected) {
      textScale.value = 1.4
      translateX.value = 0
    } else {
      textScale.value = 1
      translateX.value = 200
    }
  }, [isSelected])

  return (
    <TouchableWithoutFeedback onPress={() => selectPlayer(player)}>
      <Animated.View key={player.name} style={styles.playerContainer}>
        <Animated.Text style={[styles.playerText, textStyle]}>
          {player.name}
        </Animated.Text>
        <Animated.View
          style={[
            {
              backgroundColor: player.colour,
              height: 50,
              width: 100,
            },
            translateStyle,
          ]}
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
