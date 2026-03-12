export interface Reward {
  type: 'xp' | 'gold' | 'none'
  amount: number
  message: string
}

/**
 * Rolls a random kibble reward result.
 *
 * Outcome distribution:
 * - 30%: gold reward
 * - 30%: xp reward
 * - 40%: no reward
 *
 * Gold branch includes rare jackpots:
 * - 1% of gold rolls: super jackpot
 * - next 2% of gold rolls: jackpot
 * - otherwise: regular gold
 *
 * @returns Reward object with type, amount, and user-facing message.
 */
export const getKibbleRewardMessage = (): Reward => {
  const xpMax = 350
  const goldMax = 150
  const jackpotMin = 600
  const jackpotMax = 1500

  const randomChance = getRandomInt(1, 100)

  if (randomChance <= 30) {
    const jackpotChance = getRandomInt(1, 100)

    if (jackpotChance <= 1) {
      const superJackpotGold = getRandomInt(jackpotMax, jackpotMax + 500)
      const msg = `+${superJackpotGold} gold (super jackpot)`
      return { type: 'gold', amount: superJackpotGold, message: msg }
    } else if (jackpotChance <= 3) {
      const jackpotGold = getRandomInt(jackpotMin, jackpotMax)
      const msg = `+${jackpotGold} gold (jackpot)`
      return { type: 'gold', amount: jackpotGold, message: msg }
    } else {
      const goldAmount = getRandomInt(1, goldMax)
      const msg = `+${goldAmount} gold`
      return { type: 'gold', amount: goldAmount, message: msg }
    }
  } else if (randomChance <= 60) {
    const xpAmount = getRandomInt(50, xpMax)
    const msg = `+${xpAmount} xp`
    return { type: 'xp', amount: xpAmount, message: msg }
  } else {
    return { type: 'none', amount: 0, message: 'Nothing!' }
  }
}

/**
 * Generates a random integer between `min` and `max` (inclusive).
 *
 * @param min Lower bound (inclusive).
 * @param max Upper bound (inclusive).
 * @returns Integer value in the inclusive range.
 */
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
