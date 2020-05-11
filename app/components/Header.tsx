import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colours, fonts } from '../config/constants'

type Props = {
  title: string
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colours.WHITE,
    transform: [{ rotate: '-5deg' }],
    marginBottom: 25,
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  text: {
    fontFamily: fonts.BOLD,
    fontSize: 80,
    marginTop: -25,
  },
})

function Header({ title = 'King Domino' }: Props) {
  const splitTitle = title.split(' ')

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.background} />
        {splitTitle.map(t => (
          <Text key={t} style={styles.text}>
            {t.toUpperCase()}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default Header
