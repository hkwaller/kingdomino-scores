import React, { useState } from 'react'
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import { Header } from 'app/components'
import SmallHeader from 'app/components/SmallHeader'
import Button from 'app/components/Button'
import { colors, fonts } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 60,
  },
  views: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
})

type SmallButtonProps = {
  number: string
  onPress: () => void
  selected: boolean
}

function SmallButton({ number, selected, onPress }: SmallButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected ? colors.RED : colors.WHITE,
        flex: 1,
        paddingVertical: 20,
      }}>
      <Text
        style={{ textAlign: 'center', fontFamily: fonts.BOLD, fontSize: 40 }}>
        {number}
      </Text>
    </TouchableOpacity>
  )
}

function SelectPlayers() {
  const [selectedNumber, setSelectedNumber] = useState(2)
  const navigation = useNavigation()

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView />
        <View style={styles.views}>
          <Header title="New Game" />
          <View style={styles.viewContainer}>
            <SmallHeader title="How many players?" />
            <View style={styles.buttonContainer}>
              <SmallButton
                number="2"
                onPress={() => setSelectedNumber(2)}
                selected={2 === selectedNumber}
              />
              <SmallButton
                number="3"
                onPress={() => setSelectedNumber(3)}
                selected={3 === selectedNumber}
              />
              <SmallButton
                number="4"
                onPress={() => setSelectedNumber(4)}
                selected={4 === selectedNumber}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        title="Continue"
        backgroundColor={colors.YELLOW}
        onPress={() =>
          navigation.navigate('EnterInfo', { players: selectedNumber })
        }
        style={{ alignSelf: 'center' }}
      />
      <SafeAreaView />
    </>
  )
}

export default SelectPlayers
