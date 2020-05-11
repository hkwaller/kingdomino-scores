import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Header.styles'

type Props = {
  title: string
}

function Header({ title = 'King Domino' }: Props) {
  const splitTitle = title.split(' ')
  const navigation = useNavigation()

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
      }}>
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
      {navigation.canGoBack() && (
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>BACK</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default Header
