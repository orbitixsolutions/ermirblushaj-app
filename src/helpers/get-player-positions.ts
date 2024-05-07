import { Player } from '@prisma/client'

export const newPlayersArray = (players: Player[]) => {
  const playersAtacker = players.filter(
    (player) => player.position === 'attacker'
  )
  const playersGoalkeeper = players.filter(
    (player) => player.position === 'goalkeeper'
  )

  const newArray = [...playersAtacker, ...playersGoalkeeper]

  const newPlayersArray = newArray.map((player, index) => ({
    ...player,
    order: index + 1
  }))

  return newPlayersArray
}
