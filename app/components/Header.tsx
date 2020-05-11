import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  title: string
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.WHITE,
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
  },
})

function Header({ title = 'King Domino' }: Props) {
  const splitTitle = title.split(' ')
  const navigation = useNavigation()

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
      }}>
      {navigation.canGoBack() && (
        <View style={styles.backButton}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'transparent' }}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      )}
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
    </View>
  )
}

export default Header
