export const secondsToSexagesimal = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  const result = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`

  if (hrs > 0) {
    return `${hrs}:${result}`
  }

  return result
}
