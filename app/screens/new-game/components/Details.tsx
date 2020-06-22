import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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

  const style = useAnimatedStyle(() => {
    return {
      height: withSpring(show.value),
    }
  })

  useEffect(() => {
    show.value = expanded ? 200 : 50
  }, [expanded])

  return (
    <Animated.View style={[styles.table, style]}>
      <View>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={{ marginBottom: 30 }}
        >
          <SmallText>{expanded ? 'Hide Details' : 'Show Details'}</SmallText>
        </TouchableOpacity>
        {score.map((s, index) => {
          return (
            <Text key={index}>
              {types[index]}: {s}
            </Text>
          )
        })}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'gold',
    paddingTop: 15,
    paddingHorizontal: 30,
    overflow: 'hidden',
  },
})

export default Details
