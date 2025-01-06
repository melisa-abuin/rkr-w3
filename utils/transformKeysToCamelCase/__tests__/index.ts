import { transformKeysToCamelCase } from '..'
import { Skins } from '@/interfaces/player'

describe('transformKeysToCamelCase', () => {
  it('should correctly transform keys to camelCase', () => {
    const input = {
      SelectedAura: 'ButterflyAura',
      SelectedHat: 'PirateHat',
      SelectedSkin: 'ZandalariKitty',
      SelectedTrail: 'StarlightTrail',
      SelectedWindwalk: 'GhostlySteps',
      SelectedWings: 'CosmicWings',
    }

    const expectedOutput: Skins = {
      selectedAura: 'ButterflyAura',
      selectedHat: 'PirateHat',
      selectedSkin: 'ZandalariKitty',
      selectedTrail: 'StarlightTrail',
      selectedWindwalk: 'GhostlySteps',
      selectedWings: 'CosmicWings',
    }

    const result = transformKeysToCamelCase(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle keys not in Skins interface by ignoring them', () => {
    const input = {
      SelectedAura: 'ButterflyAura',
      SelectedHat: 'PirateHat',
      UnrelatedKey: 'ShouldNotBeIncluded',
    }

    const expectedOutput: Skins = {
      selectedAura: 'ButterflyAura',
      selectedHat: 'PirateHat',
      selectedSkin: '',
      selectedTrail: '',
      selectedWindwalk: '',
      selectedWings: '',
    }

    const result = transformKeysToCamelCase(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should return default values for missing keys', () => {
    const input = {
      SelectedAura: 'ButterflyAura',
    }

    const expectedOutput: Skins = {
      selectedAura: 'ButterflyAura',
      selectedHat: '',
      selectedSkin: '',
      selectedTrail: '',
      selectedWindwalk: '',
      selectedWings: '',
    }

    const result = transformKeysToCamelCase(input)
    expect(result).toEqual(expectedOutput)
  })

  it('should handle an empty input object', () => {
    const input = {}

    const expectedOutput: Skins = {
      selectedAura: '',
      selectedHat: '',
      selectedSkin: '',
      selectedTrail: '',
      selectedWindwalk: '',
      selectedWings: '',
    }

    const result = transformKeysToCamelCase(input)
    expect(result).toEqual(expectedOutput)
  })
})
