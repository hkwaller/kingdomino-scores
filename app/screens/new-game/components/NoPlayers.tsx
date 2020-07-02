import React from 'react'
import { Text } from 'react-native'
import { Button } from 'app/components'
import { useNavigation } from '@react-navigation/native'
import { colors, fonts } from 'app/config/constants'

function NoPlayers() {
  const navigation = useNavigation()

  return (
    <>
      <Text
        style={{
          fontFamily: fonts.LIGHT,
          fontSize: 24,
          textAlign: 'center',
          marginTop: 40,
          marginHorizontal: 20,
        }}
      >
        You haven't created any players yet. Tap below bitte.
      </Text>
      <Button
        title="Add Player"
        lean="left"
        small
        backgroundColor={colors.GREEN}
        onPress={() => navigation.navigate('AddPlayer')}
      />
    </>
  )
}
export default NoPlayers
