import AsyncStorage from '@react-native-community/async-storage'

export async function saveGame(data) {
  await AsyncStorage.setItem('games', '[]')
  try {
    const earlierGames = (await AsyncStorage.getItem('games')) || '[]'

    if (earlierGames !== null) {
      const parsedGames = JSON.parse(earlierGames)

      const newData = {
        game: data.game,
        players: data.players.map(p => p.id),
        date: new Date(),
      }

      const mergedGames = parsedGames.push(newData)

      AsyncStorage.setItem('games', JSON.stringify(mergedGames))
    } else {
      AsyncStorage.setItem('games', JSON.stringify([]))
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
  // await AsyncStorage.setItem('players', '[]')
  try {
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

    const highestExistingId =
      Math.max.apply(
        Math,
        parsedPlayers.map(p => p.id)
      ) + 1

    if (parsedPlayers.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      parsedPlayers.push(
        Object.assign(player, {
          id: highestExistingId === Infinity ? 0 : highestExistingId,
        })
      )

      AsyncStorage.setItem('players', JSON.stringify(parsedPlayers))

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}

export async function deletePlayer(player) {
  try {
    const storedPlayers = await AsyncStorage.getItem('players')
    const parsedPlayers = JSON.parse(storedPlayers || '[]')

    const filteredPlayers = parsedPlayers.filter(p => {
      if (player.id !== p.id) return p
    })

    await AsyncStorage.setItem('players', JSON.stringify(filteredPlayers))

    return filteredPlayers
  } catch (e) {
    console.log('something happened', e)
  }
}
