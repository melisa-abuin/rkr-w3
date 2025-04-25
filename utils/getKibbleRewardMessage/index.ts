export const getKibbleRewardMessage = () => {
  const xpMax = 350
  const goldMax = 150
  const jackpotMin = 600
  const jackpotMax = 1500

  const randomChance = getRandomInt(1, 100)

  if (randomChance <= 30) {
    const jackpotChance = getRandomInt(1, 100)

    if (jackpotChance <= 1) {
      const superJackpotGold = getRandomInt(jackpotMax, jackpotMax + 500)
      return `+${superJackpotGold} gold (super jackpot)`
    } else if (jackpotChance <= 3) {
      const jackpotGold = getRandomInt(jackpotMin, jackpotMax)
      return `+${jackpotGold} gold (jackpot)`
    } else {
      const goldAmount = getRandomInt(1, goldMax)
      return `+${goldAmount} gold`
    }
  } else if (randomChance <= 60) {
    const xpAmount = getRandomInt(50, xpMax)
    return `+${xpAmount} xp`
  } else {
    return 'Nothing!'
  }
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
