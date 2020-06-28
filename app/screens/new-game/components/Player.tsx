import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { colors, fonts } from 'app/config/constants'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

type Props = {
  name: string
  color: string
  onPress: () => void
  isSelected: boolean
}

function Player({ name, color, onPress, isSelected }: Props) {
  const active = useSharedValue(200)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(active.value, { duration: 400 }) }],
    }
  })

  useEffect(() => {
    console.log('isSelected: ', isSelected)
    if (isSelected) active.value = 0
    else active.value = 200
  }, [isSelected])

  return (
    <TapGestureHandler
      onHandlerStateChange={event => {
        if (event.nativeEvent.state === State.END) {
          onPress()
        }
      }}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject, backgroundColor: color },
            style,
          ]}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    marginRight: 20,
    overflow: 'hidden',
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 20,
  },
})
export default Player
