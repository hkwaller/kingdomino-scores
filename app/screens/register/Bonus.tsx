import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from 'app/components'

function Bonus() {
  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <Header title="Bonus" />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default Bonus
