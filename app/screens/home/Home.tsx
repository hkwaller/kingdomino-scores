import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from 'app/components'
import Button from 'app/components/Button'
import { colors } from 'app/config/constants'
import { useNavigation } from '@react-navigation/native'

function Home() {
  const navigation = useNavigation()

  return (
    <View contentContainerStyle={styles.container}>
      <SafeAreaView />
      <Header title="King Domino" />
      <View style={styles.buttonContainer}>
        <Button
          title="New Game"
          backgroundColor={colors.YELLOW}
          lean="right"
          onPress={() => navigation.navigate('NewGame')}
        />
        <Button
          title="Add Player"
          lean="left"
          small
          backgroundColor={colors.GREEN}
          onPress={() => navigation.navigate('AddPlayer')}
        />
        <Button
          title="Statistics"
          backgroundColor={colors.BLUE}
          lean="right"
          small
          onPress={() => navigation.navigate('Statistics')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home
