import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { fonts } from 'app/config/constants'
import {
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'

type Props = {
  player: { name: string; colour: string }
  isSelected: boolean
  selectPlayer: () => void
  deletePlayer: () => void
}

function SelectPlayer({
  player,
  isSelected,
  selectPlayer,
  deletePlayer,
}: Props) {
  const textScale = useSharedValue(1)
  const translateX = useSharedValue(200)

  const doubleTapRef = useRef(null)

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
    <LongPressGestureHandler
      ref={doubleTapRef}
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END) deletePlayer()
      }}
    >
      <TapGestureHandler
        waitFor={doubleTapRef}
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) selectPlayer()
        }}
      >
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
      </TapGestureHandler>
    </LongPressGestureHandler>
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
