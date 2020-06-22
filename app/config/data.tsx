import AsyncStorage from '@react-native-community/async-storage'

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
    const players = await AsyncStorage.getItem('players')
    return JSON.parse(players)
  } catch (e) {
    console.log('i dont know any players', e)
    return []
  }
}

export async function savePlayer(player) {
  console.log('saving this fucker: ', player)

  try {
    const storedPlayers = await AsyncStorage.getItem('players')
    const parsedPlayers = JSON.parse(storedPlayers || '[]')
    console.log('player: ', player)
    const lowestId =
      Math.min.apply(
        Math,
        parsedPlayers.map(p => p.id)
      ) + 1

    if (parsedPlayers.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      parsedPlayers.push(
        Object.assign(player, { id: lowestId === Infinity ? 0 : lowestId })
      )

      AsyncStorage.setItem('players', JSON.stringify(parsedPlayers))

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}
