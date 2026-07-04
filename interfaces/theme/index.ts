'use client'
import { PlayerColor } from '../player'

export type BadgeColor = Exclude<PlayerColor, null> | 'primary' | 'tertiary'
