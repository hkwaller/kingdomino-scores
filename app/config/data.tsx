import { AsyncStorage } from 'react-native'

export async function saveGame(game) {
  try {
    const earlierGames = await AsyncStorage.getItem('games')

    if (earlierGames !== null) {
      const parsedGames = JSON.parse(earlierGames)
      const mergedGames = parsedGames.push(game)

      AsyncStorage.setItem('games', JSON.stringify(mergedGames))
    }
  } catch (e) {
    console.log('there is nothing here')
  }
}

export async function loadGames() {
  try {
    const loadedGames = await AsyncStorage.getItem('games')
    return JSON.parse(loadedGames)
  } catch (e) {
    console.log("couldn't find any games to load")
  }
}

export async function getPlayers() {
  try {
    // AsyncStorage.setItem('players', JSON.stringify([]))

    const players = await AsyncStorage.getItem('players')
    return JSON.parse(players)
  } catch (e) {
    console.log('i dont know any players')
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

export const data = {
  players: ['Christine', 'Hannes', 'Muttis'],
  matchUps: [
    {
      players: ['Christine', 'Hannes'],
      matches: [
        {
          id: 0,
          date: '2020-05-04T17:40',
          score: [[24, 16, 8, 6, 4], [22, 6, 10, 5, 3]],
          totalScore: [54, 48],
        },
        {
          id: 1,
          date: '2020-05-04T22:40',
          score: [[14, 16, 8, 6, 4], [22, 6, 10, 5, 3]],
          totalScore: [52, 40],
        },
      ],
    },
    {
      players: ['Christine', 'Muttis'],
      matches: [
        {
          id: 0,
          date: '2020-05-02T10:40',
          score: [[14, 16, 8, 6, 4], [22, 6, 10, 5, 3]],
          totalScore: [80, 22],
        },
      ],
    },
  ],
}
