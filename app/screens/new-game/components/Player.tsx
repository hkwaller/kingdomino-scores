import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, PixelRatio } from 'react-native'
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
import { getAnimalWithColor } from 'app/config/constants'

type Props = {
  name: string
  color: string
  isSelected: boolean
  onPress: () => void
  deletePlayer?: () => void
  white?: boolean
}

function Player({
  name,
  color,
  onPress,
  isSelected,
  deletePlayer,
  white,
}: Props) {
  const active = useSharedValue(-150)
  const doubleTapRef = useRef(null)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(active.value, {
            damping: 18,
          }),
        },
      ],
    }
  })

  useEffect(() => {
    if (isSelected) active.value = 0
    else active.value = -150
  }, [isSelected])

  const imageSource = getAnimalWithColor(color, isSelected)
  const fontSize = screen.WIDTH / 25

  return (
    <LongPressGestureHandler
      ref={doubleTapRef}
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END)
          deletePlayer && deletePlayer()
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
                backgroundColor: color,
              },
              style,
            ]}
          />
          <Image source={imageSource} />
          <Text
            style={[
              styles.text,
              {
                color: isSelected ? colors.WHITE : colors.BLACK,
                fontSize: fontSize,
              },
            ]}
          >
            {name}
          </Text>
        </View>
      </TapGestureHandler>
    </LongPressGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15,
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    marginHorizontal: 10,
    overflow: 'hidden',
    alignItems: 'center',
    maxWidth: screen.WIDTH / 3 - 20,
  },
  text: {
    fontFamily: fonts.LIGHT,
    textAlign: 'center',
    marginTop: 10,
  },
})
export default Player
