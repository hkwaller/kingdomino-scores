import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  interpolateNode,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { types } from 'app/config/constants'
import SmallText from 'app/components/SmallText'

type Props = {
  score: number[]
}

function Details({ score }: Props) {
  const [expanded, setExpanded] = useState(false)
  const show = useSharedValue(50)

  const opacity = useDerivedValue(() => {
    return interpolateNode(show, {
      inputRange: [50, 80, 200],
      outputRange: [0, 1, 1],
    })
  })

  const style = useAnimatedStyle(() => {
    return {
      height: withSpring(show.value),
      opacity: withSpring(opacity.value),
    }
  })

  useEffect(() => {
    show.value = expanded ? 200 : 50
  }, [expanded])

  return (
    <>
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
    </>
  )
}

const styles = StyleSheet.create({
  table: {
    paddingTop: 15,
    overflow: 'hidden',
    width: '80%',
    alignItems: 'center',
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
