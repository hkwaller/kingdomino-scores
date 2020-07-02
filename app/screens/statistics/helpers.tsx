import { state } from 'app/config/data'

export function getStatsForPlayer(id: number) {
  const games = [
    ...new Set(
      state.games.filter(game => {
        if (game.ids.indexOf(id) > -1) return game
      })
    ),
  ]

  return games.reduce(
    (cur, acc) => {
      const bonuses = acc.players.map(p => (p.king && 10) + (p.alldominos && 5))
      const scores = acc.game.map((g, index) => {
        return g.reduce((cur, acc) => {
          return acc + cur
        }, bonuses[index])
      })

      const indexOfPlayer = acc.ids.findIndex(f => f === id)
      const indexOfMaxValue = scores.indexOf(Math.max(...scores))

      if (scores.every(s => s === scores[0])) ++cur.draws
      else if (indexOfPlayer === indexOfMaxValue) ++cur.wins
      else ++cur.losses

      return cur
    },
    { wins: 0, draws: 0, losses: 0, playedGames: games.length }
  )
}
