import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { types } from 'app/config/constants'
import SmallText from 'app/components/SmallText'

type Props = {
  score: number[]
}

function Details({ score }: Props) {
  const [expanded, setExpanded] = useState(false)
  const show = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -1 * (120 / 2) },
        {
          scaleY: withSpring(show.value, {
            overshootClamping: true,
          }),
        },
        { translateY: 120 / 2 },
      ],
    }
  })

  useEffect(() => {
    show.value = expanded ? 1 : 0
  }, [expanded])

  return (
    <View style={{ width: '80%' }}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.button}
      >
        <SmallText>{expanded ? 'Hide Details' : 'Show Details'}</SmallText>
      </TouchableOpacity>
      <Animated.View style={[styles.table, style]}>
        <View style={styles.rowContainer}>
          {score.map((points, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text>{types[index]}</Text>
                <Text>{points}</Text>
              </View>
            )
          })}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    paddingTop: 15,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    paddingVertical: 15,
    backgroundColor: 'gold',
    alignItems: 'center',
  },
  rowContainer: {
    backgroundColor: 'rgba(255,215,0,0.5)',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Details
