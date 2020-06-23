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
    show.value = expanded ? 200 : 70
  }, [expanded])

  return (
    <Animated.View style={[styles.table, style]}>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={{
            paddingVertical: 15,
            backgroundColor: 'gold',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <SmallText>{expanded ? 'Hide Details' : 'Show Details'}</SmallText>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'rgba(255,215,0,0.5)',
            width: '100%',
            height: '100%',
            padding: 15,
          }}
        >
          {score.map((points, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text>{types[index]}</Text>
                <Text>{points}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  table: {
    paddingTop: 15,
    overflow: 'hidden',
    width: '80%',
    alignItems: 'center',
  },
})

export default Details
