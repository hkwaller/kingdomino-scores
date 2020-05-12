import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from 'app/config/constants'

type Props = {
  currentIndex: number
  players: number
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '20%',
  },
})

function PageControl({ currentIndex, players }: Props) {
  console.log('currentIndex: ', currentIndex)
  return (
    <View style={styles.container}>
      {Array.from({ length: players }, (_, i) => {
        return <Circle key={i} filled={currentIndex === i} />
      })}
    </View>
  )
}

function Circle({ filled = false }: { filled: boolean }) {
  const style = filled
    ? {
        backgroundColor: colors.BLACK,
      }
    : {
        borderWidth: 2,
        borderColor: colors.BLACK,
      }
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        ...style,
      }}
    />
  )
}

export default PageControl
