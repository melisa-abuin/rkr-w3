/**
 * Builds the award image path for a given skin name.
 * @param skin - The skin name (e.g. "GoldenKitty").
 * @returns The public image path (e.g. "/awards/goldenKitty.png").
 */
export const skinToImagePath = (skin: string): string =>
  `/awards/${skin[0].toLowerCase()}${skin.slice(1)}.png`
