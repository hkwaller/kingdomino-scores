import { AsyncStorage } from 'react-native'

export async function saveGame(game) {
  console.log('game: ', game)
  try {
    const earlierGames = await AsyncStorage.getItem('games')

    if (earlierGames !== null) {
      const parsedGames = JSON.parse(earlierGames)
      const mergedGames = parsedGames.push(game)

      AsyncStorage.setItem('games', JSON.stringify(mergedGames))
    }
  } catch (e) {
    console.log('there is nothing here', e)
  }
}

export async function loadGames() {
  try {
    const loadedGames = await AsyncStorage.getItem('games')
    return JSON.parse(loadedGames)
  } catch (e) {
    console.log("couldn't find any games to load", e)
  }
}

export async function getPlayers() {
  try {
    // AsyncStorage.setItem('players', JSON.stringify([]))

    const players = await AsyncStorage.getItem('players')
    return JSON.parse(players)
  } catch (e) {
    console.log('i dont know any players', e)
    return []
  }
}

export async function savePlayer(player) {
  try {
    const storedPlayers = await AsyncStorage.getItem('players')
    const parsedPlayers = JSON.parse(storedPlayers || '[]')

    if (parsedPlayers.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      parsedPlayers.push(player)

      AsyncStorage.setItem('players', JSON.stringify(parsedPlayers))

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}
