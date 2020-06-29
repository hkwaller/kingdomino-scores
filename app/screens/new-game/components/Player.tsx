import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import {
  TapGestureHandler,
  State,
  LongPressGestureHandler,
} from 'react-native-gesture-handler'
import { colors, fonts, screen } from 'app/config/constants'
import { deletePlayer } from 'app/config/data'

type Props = {
  name: string
  color: string
  isSelected: boolean
  onPress: () => void
  deletePlayer?: () => void
}

function Player({ name, color, onPress, isSelected, deletePlayer }: Props) {
  const active = useSharedValue(-200)
  const doubleTapRef = useRef(null)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(active.value) }],
    }
  })

  useEffect(() => {
    if (isSelected) active.value = 0
    else active.value = -200
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
          if (event.nativeEvent.state === State.END) {
            onPress()
          }
        }}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                left: -200,
                backgroundColor: color,
              },
              style,
            ]}
          />
          <Text style={styles.text}>{name}</Text>
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: screen.WIDTH / 3 - 35,
    marginBottom: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    marginRight: 20,
    overflow: 'hidden',
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 20,
    textAlign: 'center',
  },
})
export default Player
