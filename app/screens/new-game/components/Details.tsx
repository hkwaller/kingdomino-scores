import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import { types } from 'app/config/constants'
import SmallText from 'app/components/SmallText'

type Props = {
  score: number[]
  king: boolean | undefined
  alldominos: boolean | undefined
}

function Details({ score, king, alldominos }: Props) {
  const [expanded, setExpanded] = useState(false)
  const show = useSharedValue(0)
  const height = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      height: height.value,
      transform: [
        { translateY: -1 * (180 / 2) },
        {
          scaleY: withSpring(show.value),
        },
        { translateY: 180 / 2 },
      ],
    }
  })

  useEffect(() => {
    show.value = expanded ? 1 : 0
    height.value = expanded ? 250 : 0
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
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
      <Text style={{ marginRight: 20 }}>{type}</Text>
      <Text style={{ fontWeight: '800', fontSize: 20 }}>{points}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    paddingTop: 15,
    flex: 1,
    overflow: 'hidden',
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
    alignItems: 'flex-start',
  },
})

export default Details
