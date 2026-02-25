/**
 * Formats the total seconds to a human-readable format [hh]:mm:ss[.ms]
 *
 * @param seconds total time in seconds
 * @param withMilliseconds whether to include milliseconds
 * @returns formatted time
 */
export const formatSecondsAsTime = (
  seconds: number,
  withMilliseconds: boolean = false,
) => {
  if (seconds === 0) {
    return 'DNF'
  }

  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  const ms = Math.floor((seconds % 1) * 1000)

  let result = `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`

  if (withMilliseconds) {
    result += `.${ms.toString().padStart(3, '0')}`
  }

  if (hrs > 0) {
    result = `${hrs}:${result}`
  }

  return result
}
