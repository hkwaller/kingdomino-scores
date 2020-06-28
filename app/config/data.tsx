import AsyncStorage from '@react-native-community/async-storage'
import { store, autoEffect } from '@risingstack/react-easy-state'

export const state = store({
  players: [],
  games: [],
  matchups: [
    [0, 1],
    [3, 1],
  ],
})

autoEffect(() => {
  if (state.players.length === 0) return
  AsyncStorage.setItem('players', JSON.stringify(state.players))
})

autoEffect(() => {
  if (state.games.length === 0) return
  AsyncStorage.setItem('games', JSON.stringify(state.games))
})

export async function saveGame(data) {
  // await AsyncStorage.setItem('games', '[]')

  const newData = {
    game: data.game,
    players: data.players.map(p => p.id),
    date: new Date(),
  }
  console.log('newData: ', newData)

  // state.games.push(newData)
}

export async function loadGames() {
  try {
    const loadedGames = await AsyncStorage.getItem('games')
    return JSON.parse(loadedGames)
  } catch (e) {
    console.log("couldn't find any games to load", e)
  }
}

export async function savePlayer(player) {
  try {
    const highestExistingId =
      Math.max.apply(Math, state.players.map(p => p.id) || 0) + 1

    if (state.players.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      state.players.push(
        Object.assign(player, {
          id: highestExistingId === -Infinity ? 0 : highestExistingId,
        })
      )

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}

export async function deletePlayer(player) {
  const t = state.players.filter(p => {
    if (player.id !== p.id) return p
  })
  state.players = t
}
