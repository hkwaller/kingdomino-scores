import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
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
  king: boolean
  alldominos: boolean
}

function Details({ score, king, alldominos }: Props) {
  const [expanded, setExpanded] = useState(false)
  const show = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -1 * (150 / 2) },
        {
          scaleY: withSpring(show.value, {
            overshootClamping: true,
          }),
        },
        { translateY: 150 / 2 },
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
            return <Row key={index} points={points} type={types[index]} />
          })}
          {king && <Row points={15} type="King" style={{ marginTop: 20 }} />}
          {alldominos && <Row points={10} type="All dominos" />}
        </View>
      </Animated.View>
    </View>
  )
}

type RowProps = {
  points: number
  type: string
  style?: StyleProp<ViewStyle>
}

function Row({ points, type, style }: RowProps) {
  return (
    <View style={[styles.row, style]}>
      <Text>{type}</Text>
      <Text style={{ fontWeight: '800', fontSize: 20 }}>{points}</Text>
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
