/**
 * Converts a hexadecimal color code to an RGBA string.
 *
 * @param hex - The hex color string (e.g. "#FF5733").
 * @param alpha - The alpha (opacity) value between 0 and 1.
 * @returns The color in `rgba(r, g, b, alpha)` format.
 */
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
