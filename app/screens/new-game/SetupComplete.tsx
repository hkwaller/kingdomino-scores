import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {}

function SetupComplete(props: Props) {
  return (
    <View style={styles.container}>
      <Text>SetupComplete</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default SetupComplete
