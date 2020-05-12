import { StyleSheet } from 'react-native'
import { colors, fonts } from 'app/config/constants'

export default StyleSheet.create({
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
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButton: {
    padding: 30,
    marginLeft: -30,
    marginTop: -30,
  },
})
