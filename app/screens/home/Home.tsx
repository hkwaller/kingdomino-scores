import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from '../../components'
import Button from '../../components/Button'
import { colours } from '../../config/constants'

type Props = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

function Home(props: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <Header title="King Domino" />
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="New Game" backgroundColor={colours.GREEN} lean="right" />
        <Button title="Continue" backgroundColor={colours.YELLOW} lean="left" />
        <Button
          title="Statistics"
          backgroundColor={colours.BLUE}
          lean="right"
        />
      </View>
    </ScrollView>
  )
}

export default Home
